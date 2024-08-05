import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';


export class UpdateItemDto {
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

}