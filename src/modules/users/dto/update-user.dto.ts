import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  name?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  surname?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  patronymic?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  skype?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  telegram?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  authNotificationEmail?: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  authNotificationTg?: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  authNotificationSms?: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  pinAuthSms?: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  pinAuthTg?: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  passwordRecovery?: boolean;

  @IsString()
  @ApiProperty()
  @IsOptional()
  token?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  password?: string;
}
