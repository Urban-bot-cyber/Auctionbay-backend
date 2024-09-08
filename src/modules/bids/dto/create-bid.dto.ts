import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBidDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @ApiProperty({ required: true })
    @IsNotEmpty()
    date: Date

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    item_id : string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    user_id: string

   
}
