import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ALREADY_REGISTERED_ERROR } from '../auth/auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(registerData: CreateUserDto) {
    const alreadyUser = await this.userRepository.findOne({
      where: { login: registerData.login },
    });

    if (alreadyUser) {
      throw new BadRequestException([ALREADY_REGISTERED_ERROR]);
    }
    const hashedPassword = await bcrypt.hash(registerData.password, 12);
    return this.userRepository.save({
      login: registerData.login,
      email: registerData.email,
      password: hashedPassword,
      token: await this.jwtService.signAsync(registerData.login),
    });
  }

  async getByToken(token: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        token: token,
      },
    });
    return user;
  }

  async deleteUser(token: string): Promise<DeleteResult> {
    const userToken = await this.userRepository.findOne({
      where: {
        token: token,
      },
    });
    return this.userRepository.delete(userToken);
  }

  async update(token: string, data: UpdateUserDto): Promise<UpdateResult> {
    const user = await this.userRepository.findOne({ where: { token } });
    return await this.userRepository.update(user, { ...data });
  }
}
