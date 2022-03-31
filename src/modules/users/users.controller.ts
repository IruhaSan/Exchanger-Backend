import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BidService } from '../bid/bid.service';
import { Connection, Repository } from 'typeorm';
import { Bid } from '../bid/entities/bid.entity';
import { HeaderEnum } from 'src/const/headers';
import { User } from './user.view';
import * as bcrypt from 'bcrypt';
import { UpdateBidDto } from '../bid/dto/update-bid.dto';

@Controller('user')
export class UsersController {
  private readonly bidRepository: Repository<Bid>;
  constructor(
    private readonly usersService: UsersService,
    private bidService: BidService,
    private connection: Connection,
  ) {
    this.bidRepository = this.connection.getRepository(Bid);
  }

  @Post()
  async create(@Res() response, @Body() user: CreateUserDto) {
    const newUser = await this.usersService.register(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Get()
  async getUser(@Headers(HeaderEnum.AUTH_TOKEN) token, @Res() response) {
    const user = await this.usersService.getByToken(token);
    const test = new User(user);
    return await response.status(HttpStatus.OK).send(test.getView());
  }

  @Delete()
  async deleteUser(@Headers(HeaderEnum.AUTH_TOKEN) token) {
    return this.usersService.deleteUser(token);
  }

  @Patch()
  async updateUser(
    @Headers(HeaderEnum.AUTH_TOKEN) token,
    @Body() data: UpdateUserDto,
  ) {
    return this.usersService.update(token, data);
  }

  @Patch('pass')
  async updateUserPass(
    @Headers(HeaderEnum.AUTH_TOKEN) token,
    @Body() data: UpdateUserDto,
  ) {
    data.password = await bcrypt.hash(data.password, 12);
    return this.usersService.update(token, data);
  }
}
