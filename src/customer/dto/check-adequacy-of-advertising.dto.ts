import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CheckAdequacyOfAdvertisingDto {
  @IsNotEmpty()
  @IsNumber()
  ad_type: number;

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
