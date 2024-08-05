import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from '@prisma/client';

@Injectable()
export class ItemsService {
    constructor(private prisma: PrismaService) {}

    async create(createitemDto: CreateItemDto) {
        return this.prisma.item.create({
            data: {
                title: createitemDto.title,
                description: createitemDto.description,
                starting_price: createitemDto.starting_price,
                end_date: createitemDto.end_date,
                image: createitemDto.image,
                user_id: createitemDto.user_id
      }
    })
  }

  findAll(){
    return this.prisma.item.findMany()
  }

  findOne(id: string){
    return this.prisma.item.findUnique({where: {id} })
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    })
  }
 

  async updateItemImage(id: string, image: string): Promise<Item> {
    const item = await this.findOne(id)
    return this.update(item.id, { ...item, image })
    }

    remove(id:string){
        return this.prisma.item.delete({where: {id}})
    }
}
