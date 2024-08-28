import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BidsService } from './bids.service';
import { BidEntity } from 'src/entities/bid.entity';
import { CreateBidDto } from './dto/create-bid.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateBidDto } from './dto/update-bid.dto';

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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: BidEntity, isArray: true })
    findAll() {
      return this.bidService.findAll()
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
