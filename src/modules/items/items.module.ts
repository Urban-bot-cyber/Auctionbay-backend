import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [PrismaModule],
})
export class ItemsModule {}
