import { BadRequestException, Injectable } from '@nestjs/common';
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
    

    async updatePassword(userId: string, oldPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
        // Ensure the new password and confirm password match
        if (newPassword !== confirmPassword) {
          throw new BadRequestException('New password and confirm password do not match');
        }
    
        // Fetch the user from the database
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
        });
    
        if (!user) {
          throw new BadRequestException('User not found');
        }
    
        // Check if the old password matches
        const passwordMatches = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatches) {
          throw new BadRequestException('Old password is incorrect');
        }
    
        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        // Update the user's password in the database
        await this.prisma.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });
      }

      async updateAvatar(id: string, filePath: string) {
        return this.prisma.user.update({
          where: { id },
          data: { avatar: filePath },
        })
      }
    
}

