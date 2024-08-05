import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    @ApiProperty()
    id: string

    @ApiProperty()
    created_At: Date

    @ApiProperty()
    updated_At: Date

    @ApiProperty()
    first_name: string

    @ApiProperty()
    last_name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    avatar: string

    @Exclude()
    password: string
}