import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  role: string;

  @IsNotEmpty()
  @IsString()
  nick_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
