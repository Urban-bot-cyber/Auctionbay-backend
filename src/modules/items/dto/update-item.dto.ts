import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateItemDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    starting_price: number

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    end_date: Date

    @ApiProperty({ required: false})
    @IsOptional()
    image?: string

}