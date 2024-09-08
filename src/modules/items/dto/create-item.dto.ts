import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsSemVer, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class CreateItemDto{
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

    @ApiProperty({ required: true})
    @IsNotEmpty()
    @IsString()
    user_id: string
}
