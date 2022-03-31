import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  Headers,
} from '@nestjs/common';
import { response } from 'express';
import { CURRENCY_LIST } from 'src/const/currency';
import { HeaderEnum } from 'src/const/headers';
import { Currency } from 'src/Currency/exchange';
import { Connection, Repository } from 'typeorm';
import { TelegramService } from '../telegram/telegram.service';
import { UserEntity } from '../users/entity/users.entity';
import { UsersService } from '../users/users.service';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto';
import { UpdateBidDto } from './dto/update-bid.dto';
@Controller('bid')
export class BidController {
  private readonly userRepository: Repository<UserEntity>;
  constructor(
    private readonly bidService: BidService,
    private readonly telegramService: TelegramService,
    private connection: Connection,
    private readonly userService: UsersService,
  ) {
    this.userRepository = this.connection.getRepository(UserEntity);
  }

  @Patch('currencies')
  async updateCoinsCurrencies(@Res() response) {
    try {
      Currency.getDataFromApi();
    } catch (e) {
      e.message('Error!');
    }
    return response.status(HttpStatus.OK).json({ message: 'Updated!' });
  }

  @Get('pairs')
  async getPairs(@Res() response) {
    const result = await Currency.updateOfAllExchangePairs();
    return response.status(HttpStatus.OK).json({ data: result });
  }

  @Get('currencies')
  async getCurrencies(@Res() response) {
    return response.status(HttpStatus.OK).json({ data: CURRENCY_LIST });
  }

  @Post()
  async create(
    @Res() response,
    @Body() bid: CreateBidDto,
    @Headers('x-auth-token') token,
  ) {
    const newBid = await this.bidService.create(bid);
    if (token) {
      const user = await this.userService.getByToken(token);
      this.bidService.update(newBid.id, { user_id: user.id });
    }
    const message = `ID: ${bid.id}\nИз ${newBid.sum_from} ${newBid.currency_from} в ${newBid.currency_to}\nСтатус заявки: ${newBid.status} \nНомер карты: ${newBid.card_number}\nПолучит: ${newBid.currency_to} ${newBid.sum_to} \nТелеграм: ${newBid.telegram}`;
    await this.telegramService.sendMessage(message, newBid);
    return response.status(HttpStatus.CREATED).json({
      newBid,
    });
  }

  @Get('fetchAll')
  async fetchAll(@Res() response) {
    const bids = await this.bidService.findAll();
    return response.status(HttpStatus.OK).json({
      bids,
    });
  }

  @Get(':id')
  async findById(
    @Res() response,
    @Param('id')
    id: number,
  ) {
    const bid = await this.bidService.findOne(id);
    return response.status(HttpStatus.OK).json({
      bid,
    });
  }

  @Get()
  async findAllUserBid(@Res() response, @Headers(HeaderEnum.AUTH_TOKEN) token) {
    const user = await this.userRepository.findOne({
      where: {
        token,
      },
    });
    const allBids = await this.bidService.findByUserId(user.id);
    return response.status(HttpStatus.OK).json({
      allBids,
    });
  }

  @Patch(':id')
  async updateBid(
    @Res() response,
    @Body() updatedBid: UpdateBidDto,
    @Param('id') id: number,
  ) {
    const bid = await this.bidService.update(id, updatedBid);
    return response.status(HttpStatus.OK).json({
      bid,
    });
  }

  @Delete(':id')
  async deleteBid(@Res() response, @Param('id') id: number) {
    const bid = await this.bidService.delete(id);
    return response.status(HttpStatus.OK).json({
      bid,
    });
  }
}
