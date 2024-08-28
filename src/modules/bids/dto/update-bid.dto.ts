import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';


export class UpdateBidDto {
    @ApiProperty({ required: false })
    @IsOptional()
    amount?: number

    @ApiProperty({ required: false })
    @IsOptional()
    date?: Date

    @ApiProperty({ required: false })
    @IsOptional()
    item_id?: string

    @ApiProperty({ required: false })
    @IsOptional()
    user_id?: string


}