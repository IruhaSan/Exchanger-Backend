import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entity/users.entity';
import { Connection, Repository } from 'typeorm';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { INVALID_PASSWORD_ERROR, USER_NOT_FOUND_ERROR } from './auth.constants';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  private readonly userRepository: Repository<UserEntity>;
  constructor(
    private connection: Connection,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {
    this.userRepository = this.connection.getRepository(UserEntity);
  }

  async login(data: AuthLoginDto) {
    const payload = { login: data };
    const user = await this.userRepository.findOne({
      where: {
        login: data.login,
      },
    });
    const newToken = await this.jwtService.sign(payload).toString();
    await this.userService.update(user.token, { token: newToken });
    return {
      access_token: newToken,
    };
  }

  async validateUser(
    login: string,
    pass: string,
  ): Promise<Pick<UserEntity, 'login'>> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new UnauthorizedException([USER_NOT_FOUND_ERROR]);
    }
    const isCorrectPassword = await bcrypt.compare(pass, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException([INVALID_PASSWORD_ERROR]);
    }
    return { login: user.login };
  }
}
