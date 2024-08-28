import { ApiProperty } from '@nestjs/swagger'
import { Item } from '@prisma/client'

export class ItemEntity implements Item {
    @ApiProperty()
    id: string

    @ApiProperty()
    created_At: Date

    @ApiProperty()
    updated_At: Date

    @ApiProperty({required: true})
    title: string

    @ApiProperty()
    description: string

    @ApiProperty()
    starting_price: number

    @ApiProperty()
    end_date: Date

    @ApiProperty()
    image: string

    @ApiProperty({ required: true})
    user_id: string

}