import { Injectable } from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto'


export const roundsOfHashing = 10

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            roundsOfHashing
        )
        createUserDto.password = hashedPassword

        return this.prisma.user.create({data: createUserDto})
    }

    findAll(){
        return this.prisma.user.findMany()
    }

    findOne(id: string){
        return this.prisma.user.findUnique({where: {id} })
    }

    async update(id: string, updateUserDto: UpdateUserDto){
        if(updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(
                updateUserDto.password,
                roundsOfHashing,
            )
        }
        return this.prisma.user.update({ where: {id}, data:updateUserDto})
    }

    remove(id:string){
        return this.prisma.user.delete({where: {id}})
    }
    
}
