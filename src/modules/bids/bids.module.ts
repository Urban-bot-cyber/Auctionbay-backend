import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [BidsService],
  controllers: [BidsController],
  imports: [PrismaModule],
})
export class BidsModule {}
