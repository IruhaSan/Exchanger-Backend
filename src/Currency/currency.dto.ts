import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CurrencyDto {
  @IsString()
  currencyTo: string;

  @IsString()
  currencyFrom: string;

  @IsNumber()
  @IsOptional()
  sumFrom: number;
}
