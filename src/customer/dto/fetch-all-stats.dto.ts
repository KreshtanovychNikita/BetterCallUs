import { IsNotEmpty, IsNumber } from 'class-validator';

export class FetchAllStatsDto {
  @IsNotEmpty()
  @IsNumber()
  ad_type: number;

  @IsNotEmpty()
  @IsNumber()
  product_profit: number;

  @IsNotEmpty()
  @IsNumber()
  last_ad_day: number;

  @IsNotEmpty()
  @IsNumber()
  product_cost: number;

  @IsNotEmpty()
  @IsNumber()
  ad_number: number;

  @IsNotEmpty()
  @IsNumber()
  max_customer_number: number;
}