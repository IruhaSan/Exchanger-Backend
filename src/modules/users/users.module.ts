import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getJWTConfig } from 'src/configs/jwt.config';
import { BidModule } from '../bid/bid.module';
import { BidService } from '../bid/bid.service';
import { Bid } from '../bid/entities/bid.entity';
import { UserEntity } from './entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, BidService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([Bid]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJWTConfig,
      inject: [ConfigService],
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
