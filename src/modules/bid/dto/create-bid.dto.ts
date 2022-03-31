import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateBidDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @ApiProperty()
  currency_to: string;

  @IsString()
  @ApiProperty()
  currency_from: string;

  @IsNumber()
  @ApiProperty()
  sum_to: number;

  @IsNumber()
  @ApiProperty()
  sum_from: number;

  @IsString()
  @ApiProperty()
  card_number: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  status: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  user_id: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  telegram: string;

  @IsPhoneNumber('RU')
  @ApiProperty()
  phone_number: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  FCs: string;
}
