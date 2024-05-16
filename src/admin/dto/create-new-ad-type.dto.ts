import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNewAdTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  ad_density: number;

  @IsNotEmpty()
  @IsNumber()
  coefficient_k: number;

  @IsNotEmpty()
  @IsNumber()
  ad_number_percent: number;

  @IsNotEmpty()
  @IsNumber()
  ad_act_cost: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
