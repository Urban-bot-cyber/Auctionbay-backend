import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Bid, Item, User } from '@prisma/client';

@Injectable()
export class BidsService {
    constructor(private prisma: PrismaService) {}

  async create(data: CreateBidDto) {
    return this.prisma.bid.create({
      data,
    })
  }

  findAll(){
    return this.prisma.bid.findMany()
  }

  findByItemId(item_id: string){
    return this.prisma.bid.findMany({
      where: {item_id}, 
      include: {
        user: true, 
        item: true,
      }
    })
  }

  async findAllByUserID(user_id: string): Promise<(Bid &{ item: Item; user: User })[]> {
    const bids = await this.prisma.bid.findMany({
      where: { user_id },
      include: {
        item: true,
        user: true
      },
    });
    
    return bids;
  }



  findHighestBidForItem(item_id: string) {
    const highestBid =  this.prisma.bid.findFirst({
      where: {
        item_id,
      },
      orderBy: {
        amount: 'desc', 
      },
    });
    return highestBid;
  }

  findOne(id: string){
    return this.prisma.bid.findUnique({where: {id} })
  }

  update(id: string, updateBidDto: UpdateBidDto) {
    return this.prisma.item.update({
      where: { id },
      data: updateBidDto,
    })
  }
 
    remove(id:string){
        return this.prisma.bid.delete({where: {id}})
    }

}
