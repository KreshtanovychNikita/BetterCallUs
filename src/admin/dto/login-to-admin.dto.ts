import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginToAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
