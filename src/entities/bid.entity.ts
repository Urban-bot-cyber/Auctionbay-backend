import { ApiProperty } from "@nestjs/swagger";
import { Bid } from "@prisma/client";


export class BidEntity implements Bid{
    @ApiProperty()
    id:string
    
    @ApiProperty({ required: true })
    amount:number

    @ApiProperty({ required: true })
    date:Date

    @ApiProperty({ required: true })
    item_id:string

    @ApiProperty({ required: true })
    user_id: string
  
    @ApiProperty()
    created_At:Date

    @ApiProperty()
    updated_At:Date

}