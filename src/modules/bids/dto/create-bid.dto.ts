import { ApiProperty } from "@nestjs/swagger"

export class CreateBidDto{
    @ApiProperty({ required: true })
    amount: number

    @ApiProperty({ required: true })
    date: Date

    @ApiProperty({ required: true })
    item_id : string

    @ApiProperty({ required: true })
    user_id: string

   
}
