import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewUserAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  nick_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
