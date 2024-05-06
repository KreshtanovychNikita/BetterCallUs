import { IsNotEmpty, IsNumber } from 'class-validator';

export class CalculateTOneDto {
  @IsNotEmpty()
  @IsNumber()
  ad_type: number;

  @IsNotEmpty()
  @IsNumber()
  ad_number: number;

  @IsNotEmpty()
  @IsNumber()
  max_customer_number: number;

}
