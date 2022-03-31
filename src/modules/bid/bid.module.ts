import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { TelegramModule } from '../telegram/telegram.module';
import { UsersModule } from '../users/users.module';
import { UserEntity } from '../users/entity/users.entity';

@Module({
  controllers: [BidController],
  providers: [BidService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Bid]),
    TypeOrmModule.forFeature([UserEntity]),
    TelegramModule,
  ],
  exports: [BidService],
})
export class BidModule {}
