import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResultForRangeDto {
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
  @IsNumber()
  last_ad_day: number;
}
