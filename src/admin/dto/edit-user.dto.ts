import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  nick_name: string;
}
