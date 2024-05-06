import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
