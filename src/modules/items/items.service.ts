import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import path from 'path';
import * as fs from 'fs';

@Injectable()
export class ItemsService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateItemDto) {
      return this.prisma.item.create({
        data,
      })
    }

  findAll(){
    return this.prisma.item.findMany()
  }

  findOne(id: string){
    return this.prisma.item.findUnique({where: {id} })
  }

  findByUserId(user_id: string){
    return this.prisma.item.findMany({
      where: {user_id},
      orderBy: {
        end_date: 'desc',
      },
    })
  }


  update(id: string, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    })
  }
 
  async updateItemImage(id: string, newFilePath: string): Promise<Item> {
    try {

      const item = await this.prisma.item.findUnique({
        where: { id },
      });

      if (!item) {
        throw new Error(`Item with ID ${id} not found.`);
      }

      if (item.image) {

        const oldFilePath = path.join(__dirname, '..', '..', 'public', item.image);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); 
        }
      }

      return await this.prisma.item.update({
        where: { id },
        data: { image: newFilePath },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Record to update not found.');
      }
      throw new InternalServerErrorException('Something went wrong while updating the item image.');
    }
  }
    remove(id:string){
        return this.prisma.item.delete({where: {id}})
    }

}
