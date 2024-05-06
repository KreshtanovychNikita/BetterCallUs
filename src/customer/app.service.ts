import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { CheckAdequacyOfAdvertisingDto } from './dto/check-adequacy-of-advertising.dto';
import { NumberOfBuyersDto } from './dto/number-of-buyers.dto';
import { CalculateTOneDto } from './dto/calculate-t-one.dto';
import { ResultForRangeDto } from './dto/result-for-range.dto';
import { FetchAllStatsDto } from './dto/fetch-all-stats.dto';
import { CreateNewOrderDto } from './dto/create-new-order.dto';
import { AdAnalysisEntity } from '../entities/ad-analysis.entity';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class AppService {
  @InjectRepository(UserEntity)
  private UserRepository: Repository<UserEntity>;

  @InjectRepository(AdAnalysisEntity)
  private AdAnalysisRepository: Repository<AdAnalysisEntity>;

  // private product_cost = 2;
  // private ad_density = 0.0001;
  // private ad_number = 0.045;
  // private max_customer_number = 20000;
  // private coefficient_k = 0.2;
  private s = 10;
  // private G12: number;
  getHello(): string {
    return 'Hello World!';
  }

  async createNewUser(createNewUser: CreateNewUserDto) {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(createNewUser.password, salt);
      await this.UserRepository.createQueryBuilder('user')
        .insert()
        .into(UserEntity)
        .values({
          email: createNewUser.email,
          role: 'customer',
          nick_name: createNewUser.nick_name,
          password: hashedPassword,
        })
        .execute();
      return createNewUser;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async login(loginUser: LoginUserDto) {
    try {
      const user = await this.UserRepository.findOne({
        where: { email: loginUser.email },
      });
      if (!user) {
        return false;
      }
      const isPasswordValid = await bcrypt.compare(
        loginUser.password,
        user.password,
      );

      return {
        login: isPasswordValid,
        name: user.nick_name,
        role: user.role,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async checkAdequacyOfAdvertising(data: CheckAdequacyOfAdvertisingDto) {
    try {
      return (
        data.product_cost *
          data.ad_density *
          (data.ad_density ** 2 / data.ad_number ** 2 +
            2 *
              data.max_customer_number *
              (1 - 2 * data.coefficient_k) *
              (data.ad_number / data.ad_density) +
            data.max_customer_number ** 2) >
        this.s * (data.ad_number / data.ad_density)
      );
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async calculateNumberOfBuyers(data: NumberOfBuyersDto) {
    try {
      const exponent =
        -data.coefficient_k *
        (data.ad_number + data.ad_density * data.max_customer_number) *
        150;
      const result =
        (data.ad_number / data.ad_density) *
          ((data.ad_number + data.ad_density * data.max_customer_number) /
            (data.ad_number +
              data.ad_density *
                data.max_customer_number *
                Math.E ** exponent)) -
        1;
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async calculateTOne(data: CalculateTOneDto) {
    try {
      const part =
        (data.ad_density / data.ad_number) * data.max_customer_number;
      const result =
        (Math.log(part) /
          (data.coefficient_k *
            (data.ad_number / data.ad_density + data.max_customer_number))) *
        data.ad_density;
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async calculateResults(G12: number, data: ResultForRangeDto) {
    try {
      const result =
        (data.ad_number / data.ad_density) *
        ((data.ad_number + data.ad_density * data.max_customer_number) /
          (data.ad_number +
            data.ad_density *
              data.max_customer_number *
              Math.exp(
                -data.coefficient_k *
                  (data.ad_number +
                    data.ad_density * data.max_customer_number) *
                  G12,
              )) -
          1);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async calculateResultsForRange(data: ResultForRangeDto) {
    const results: Record<number, number> = {};
    for (let G12 = 0; G12 <= data.last_ad_day; G12++) {
      const result = this.calculateResults(G12, data);
      results[G12] = await result;
    }
    return results;
  }

  async fetchAllStats(data: FetchAllStatsDto) {
    try {
      const checkAdequacyOfAdvertising =
        await this.checkAdequacyOfAdvertising(data);
      const calculateNumberOfBuyers = await this.calculateNumberOfBuyers(data);
      const calculateTOne = await this.calculateTOne(data);
      const calculateResultsForRange =
        await this.calculateResultsForRange(data);

      const totalIncome = data.product_profit * calculateNumberOfBuyers;
      const totalCosts = data.ad_act_cost * data.last_ad_day * data.ad_density;
      const profit = totalIncome - totalCosts;

      if (checkAdequacyOfAdvertising) {
        return {
          adequacyOfAdvertising: checkAdequacyOfAdvertising,
          tOne: calculateTOne,
          numberOfBuyers: calculateNumberOfBuyers,
          dataForDiagrams: calculateResultsForRange,
          totalIncome: totalIncome,
          totalCost: totalCosts,
          profit: profit,
        };
      } else {
        return { AdequacyOfAdvertising: checkAdequacyOfAdvertising };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getCustomerByEmail(email: string) {
    try {
      const user = await this.UserRepository.findOne({
        where: { email: email },
      });
      console.log(user);
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async getCustomerById(customerId: number) {
    try {
      const user = await this.UserRepository.findOne({
        where: { id: customerId },
      });
      console.log(user);
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async createNewOrder(data: CreateNewOrderDto) {
    try {
      const adModel = await this.fetchAllStats(data);
      const customer = await this.getCustomerByEmail(data.email);
      const key = `K2024${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
      await this.AdAnalysisRepository.createQueryBuilder('analysis')
        .insert()
        .into(AdAnalysisEntity)
        .values({
          email: data.email,
          customer_id: customer.id,
          adequacy_of_advertising: adModel.adequacyOfAdvertising,
          t_one: adModel.tOne,
          number_of_buyers: adModel.numberOfBuyers,
          data_for_diagrams: adModel.dataForDiagrams,
          total_income: adModel.totalIncome,
          total_cost: adModel.totalCost,
          profit: adModel.profit,
          key: key,
        })
        .execute();
      return {
        email: data.email,
        adModel,
        key: key,
      };
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getOrderByCustomerEmail(email: GetUserDto) {
    const customer = await this.getCustomerByEmail(email.email);
    try {
      const orders = await this.AdAnalysisRepository.find({
        where: { customer_id: customer.id },
      });
      console.log(orders);
      return orders;
    } catch (e) {
      console.error(e);
    }
  }
}
