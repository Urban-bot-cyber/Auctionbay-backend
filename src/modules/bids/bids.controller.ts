import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BidsService } from './bids.service';
import { BidEntity } from 'src/entities/bid.entity';
import { CreateBidDto } from './dto/create-bid.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Bid } from '@prisma/client';
import { Item } from '@prisma/client';
import { ItemEntity } from 'src/entities/item.entity';

@Controller('bids')
@ApiTags('bids')
export class BidsController {
    constructor(private readonly bidService: BidsService) { }

    @Post()
    @ApiCreatedResponse({ type: BidEntity})
    create(@Body() createBidDto: CreateBidDto) {
      return this.bidService.create(createBidDto)
    }
  
    @Get()
    @ApiOkResponse({ type: BidEntity, isArray: true })
    findAll() {
      return this.bidService.findAll()
    }
  
    @Get('item/:item_id')
    @HttpCode(HttpStatus.OK)
    findByItemId(@Param('item_id') item_id: string){
      return this.bidService.findByItemId(item_id)
    }

    @Get('item/top/:item_id')
    @HttpCode(HttpStatus.OK)
    async findBiggiestForItemId(@Param('item_id') item_id: string): Promise<Bid> {
        const condition = { item: { id: item_id } }
        const bids = await this.bidService.findByItemId(condition.item.id)

        bids.sort((a, b) => b.amount - a.amount)

        return bids[0]
    }

    @Get('user/:user_id')
    @HttpCode(HttpStatus.OK)
    async findByUserId(@Param('user_id') user_id: string): Promise<Bid[]> {
      const bids = await this.bidService.findAllByUserID(user_id)

      const now = new Date()
      const highestBids = new Map<string, Bid>()

      bids.forEach((bid) => {
        if (bid.item) {
          const isExpired = new Date(bid.item.end_date) < now
          if (!isExpired) {
            const existingBid = highestBids.get(bid.item.id)

            if (!existingBid || bid.amount > existingBid.amount) {
              highestBids.set(bid.item.id, bid)
            }
          }
        }
      });

      return Array.from(highestBids.values());
    }

    @Get('user/won/:user_id')
    @HttpCode(HttpStatus.OK)
    async findWonByUserId(@Param('user_id') user_id: string): Promise<Bid[]> {
      const bids = await this.bidService.findAllByUserID(user_id)

      const now = new Date();
      const highestBidsDone = new Map<string, Bid>()

      bids.forEach((bid) => {
        const isExpired = new Date(bid.item.end_date) < now

        if (isExpired) {
          const currentHighestBid = highestBidsDone.get(bid.item.id)
          if (!currentHighestBid || bid.amount > currentHighestBid.amount) {
            highestBidsDone.set(bid.item.id, bid);
          }
        }
      })

      return Array.from(highestBidsDone.values())
    }

    @Get(':id')
    @ApiOkResponse({ type: BidEntity })
    findOne(@Param('id') id: string) {
      return this.bidService.findOne(id)
    }
  
    @Patch(':id')
    @ApiCreatedResponse({ type: BidEntity })
    update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
      return this.bidService.update(id, updateBidDto)
    }
  
    @Delete(':id')
    @ApiOkResponse({ type: BidEntity })
    remove(@Param('id') id: string) {
      return this.bidService.remove(id)
    }

  }
