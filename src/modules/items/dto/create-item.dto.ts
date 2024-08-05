import { IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateItemDto{
    @ApiProperty({ required: true })
    title: string

    @ApiProperty({ required: false })
    @IsOptional()
    description?: string

    @ApiProperty({ required: true })
    starting_price: number

    @ApiProperty({ required: true })
    end_date: Date

    @ApiProperty({ required: false})
    @IsOptional()
    image?: string

    @ApiProperty({ required: true})
    user_id: string
}
