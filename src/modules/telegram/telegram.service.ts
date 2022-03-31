import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Connection, Repository } from 'typeorm';
import { BidStatusState } from '../bid/bid.constants';
import { Bid } from '../bid/entities/bid.entity';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { ITelegramOptions } from './telegram.interface';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: ITelegramOptions;
  private readonly bidRepository: Repository<Bid>;
  constructor(
    @Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions,
    private connection: Connection,
  ) {
    this.options = options;
    this.bidRepository = this.connection.getRepository(Bid);
    this.bot = new Telegraf(options.token);
  }

  async sendMessage(
    message: string,
    bid: Bid,
    chatId: string = this.options.chatId,
  ) {
    await this.bot.telegram.sendMessage(chatId, message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Изменить статус на шаг вперед',
              callback_data: '1',
            },
          ],
          [
            {
              text: 'Изменить статус на шаг назад',
              callback_data: '-1',
            },
          ],
        ],
      },
    });
    await this.bot.action('1', (ctx) => {
      console.log(bid.status);
      if (bid.status == BidStatusState.handling) {
        bid.status = BidStatusState.waiting;
      }
      this.bidRepository.save(bid);
    });
  }
}
