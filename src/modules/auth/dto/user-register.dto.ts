import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @ApiProperty()
  login: string;
  @IsString()
  @ApiProperty()
  password: string;
}
