import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { BidModule } from './modules/bid/bid.module';
import { Bid } from './modules/bid/entities/bid.entity';
import { UserEntity } from './modules/users/entity/users.entity';
import { UsersModule } from './modules/users/users.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { getTelegramConfig } from './configs/telegram.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EnvModeEnum } from './types/environment';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Bid]),
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forRoot({
      envFilePath: [
        ...(process.env.NODE_ENV !== EnvModeEnum.PRODUCTION
          ? ['.env.development.local', '.env.development']
          : ['.env.production.local', '.env.production']),
        '.env.local',
        '.env',
      ],
    }),
    BidModule,
    UsersModule,
    AuthModule,
    ConfigModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static'),
      exclude: ['/api*'],
      serveRoot: '/static',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
