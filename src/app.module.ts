import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ItemsModule } from './modules/items/items.module';
import { BidsModule } from './modules/bids/bids.module';


@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ItemsModule, BidsModule, ],
  controllers: [AppController],
  providers: [AppService],
 
})
export class AppModule {}
