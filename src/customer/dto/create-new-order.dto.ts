import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNewOrderDto {
  @IsNotEmpty()
  @IsNumber()
  product_profit: number;

  @IsNotEmpty()
  @IsNumber()
  last_ad_day: number;

  @IsNotEmpty()
  @IsNumber()
  ad_act_cost: number;

  @IsNotEmpty()
  @IsNumber()
  product_cost: number;

  @IsNotEmpty()
  @IsNumber()
  ad_density: number;

  @IsNotEmpty()
  @IsNumber()
  ad_number: number;

  @IsNotEmpty()
  @IsNumber()
  max_customer_number: number;

  @IsNotEmpty()
  @IsNumber()
  coefficient_k: number;

  @IsNotEmpty()
  @IsString()
  email: string;
}
