import { Body, Controller, Get, Header, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }

  @Post("registration/createNewUser")
  async createNewUser(@Body() createNewUserDto: CreateNewUserDto, @Req() req) {
    return this.appService.createNewUser(createNewUserDto);
  }

  @Post("registration/login")
  async login (@Body() loginUserDto: LoginUserDto, @Req() req) {
    return this.appService.login(loginUserDto);
  }
}
