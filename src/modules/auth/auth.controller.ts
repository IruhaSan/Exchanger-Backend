import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from '../users/entity/users.entity';
import { Connection, Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  private readonly userRepository: Repository<UserEntity>;
  constructor(
    private connection: Connection,
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.userRepository = this.connection.getRepository(UserEntity);
  }

  @Post('login')
  async signinJwt(@Body() loginData: AuthLoginDto) {
    await this.authService.validateUser(loginData.login, loginData.password);
    return this.authService.login(loginData);
  }
}
