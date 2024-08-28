import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Injectable()
export class BidsService {
    constructor(private prisma: PrismaService) {}

    async create(createBidDto: CreateBidDto) {
        return this.prisma.bid.create({
            data: {
                amount: createBidDto.amount,
                date: createBidDto.date,
                item_id: createBidDto.item_id,
                user_id: createBidDto.user_id,
      }
    })
  }

  findAll(){
    return this.prisma.bid.findMany()
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
