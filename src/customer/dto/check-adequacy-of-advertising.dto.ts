import { IsNotEmpty, IsNumber } from 'class-validator';

export class CheckAdequacyOfAdvertisingDto {
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
}
