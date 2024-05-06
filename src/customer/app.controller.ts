import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CheckAdequacyOfAdvertisingDto } from './dto/check-adequacy-of-advertising.dto';
import { NumberOfBuyersDto } from './dto/number-of-buyers.dto';
import { CalculateTOneDto } from './dto/calculate-t-one.dto';
import { ResultForRangeDto } from './dto/result-for-range.dto';
import { FetchAllStatsDto } from './dto/fetch-all-stats.dto';
import { CreateNewOrderDto } from './dto/create-new-order.dto';
import { GetUserDto } from './dto/get-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }

  @Post('registration/createNewUser')
  async createNewUser(@Body() createNewUserDto: CreateNewUserDto) {
    return this.appService.createNewUser(createNewUserDto);
  }

  @Post('registration/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.appService.login(loginUserDto);
  }

  @Post('calculating/adequacyOfAdvertising')
  async checkAdequacyOfAdvertising(
    @Body() checkAdequacyOfAdvertisingDto: CheckAdequacyOfAdvertisingDto,
  ) {
    return this.appService.checkAdequacyOfAdvertising(
      checkAdequacyOfAdvertisingDto,
    );
  }

  @Post('calculating/calculateNumberOfBuyers')
  async calculateNumberOfBuyers(@Body() numberOfBuyers: NumberOfBuyersDto) {
    return this.appService.calculateNumberOfBuyers(numberOfBuyers);
  }

  @Post('calculating/calculateTOne')
  async calculateTOne(@Body() calculateTOne: CalculateTOneDto) {
    return this.appService.calculateTOne(calculateTOne);
  }

  @Post('calculating/calculateResultsForRange')
  async calculateResultsForRange(@Body() resultForRange: ResultForRangeDto) {
    return this.appService.calculateResultsForRange(resultForRange);
  }

  @Post('calculating/fetchAllStats')
  async fetchAllStats(@Body() fetchAllStats: FetchAllStatsDto) {
    return await this.appService.fetchAllStats(fetchAllStats);
  }

  @Post('calculating/createNewOrder')
  async createNewOrder(@Body() createNewOrder: CreateNewOrderDto) {
    return await this.appService.createNewOrder(createNewOrder);
  }

  @Post('getCustomerByEmail')
  async getCustomerByEmail(@Body() email: string) {
    return await this.appService.getCustomerByEmail(email);
  }

  @Post('getCustomerById')
  async getCustomerById(@Body() customerId: number) {
    return await this.appService.getCustomerById(customerId);
  }

  @Post('getOrderByCustomerEmail')
  async getOrderByCustomerEmail(@Body() email: GetUserDto) {
    return await this.appService.getOrderByCustomerEmail(email);
  }
}
