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
import { AdTypeEntity } from '../entities/ad-type.entity';

@Injectable()
export class AppService {
  @InjectRepository(UserEntity)
  private UserRepository: Repository<UserEntity>;

  @InjectRepository(AdAnalysisEntity)
  private AdAnalysisRepository: Repository<AdAnalysisEntity>;

  @InjectRepository(AdTypeEntity)
  private AdTypeRepository: Repository<AdTypeEntity>;

  private s = 10;
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

  async getAdConstValueById(id: number) {
    try {
      const adType = await this.AdTypeRepository.findOne({
        where: { id: id },
      });
      if (adType) {
        return adType;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async checkAdequacyOfAdvertising(data: CheckAdequacyOfAdvertisingDto) {
    try {
      const values = await this.getAdConstValueById(data.ad_type);
      const adNumber = data.ad_number / values.ad_number_percent;
      return (
        data.product_cost *
          values.ad_density *
          (values.ad_density ** 2 / adNumber ** 2 +
            2 *
              data.max_customer_number *
              (1 - 2 * values.coefficient_k) *
              (adNumber / values.ad_density) +
            data.max_customer_number ** 2) >
        this.s * (adNumber / values.ad_density)
      );
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async calculateNumberOfBuyers(data: NumberOfBuyersDto) {
    try {
      const values = await this.getAdConstValueById(data.ad_type);
      const adNumber = data.ad_number / values.ad_number_percent;
      const exponent =
        -values.coefficient_k *
        (adNumber + values.ad_density * data.max_customer_number) *
        150;
      const result =
        (adNumber / values.ad_density) *
          ((adNumber + values.ad_density * data.max_customer_number) /
            (adNumber +
              values.ad_density *
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
      const values = await this.getAdConstValueById(data.ad_type);
      const adNumber = data.ad_number / values.ad_number_percent;
      const part = (values.ad_density / adNumber) * data.max_customer_number;
      const result =
        (Math.log(part) /
          (values.coefficient_k *
            (adNumber / values.ad_density + data.max_customer_number))) *
        values.ad_density;
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async calculateResults(G12: number, data: ResultForRangeDto) {
    try {
      const values = await this.getAdConstValueById(data.ad_type);
      const adNumber = data.ad_number / values.ad_number_percent;
      const result =
        (adNumber / values.ad_density) *
        ((adNumber + values.ad_density * data.max_customer_number) /
          (adNumber +
            values.ad_density *
              data.max_customer_number *
              Math.exp(
                -values.coefficient_k *
                  (adNumber + values.ad_density * data.max_customer_number) *
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
      const values = await this.getAdConstValueById(data.ad_type);
      const checkAdequacyOfAdvertising =
        await this.checkAdequacyOfAdvertising(data);
      const calculateNumberOfBuyers = await this.calculateNumberOfBuyers(data);
      const calculateTOne = await this.calculateTOne(data);
      const calculateResultsForRange =
        await this.calculateResultsForRange(data);

      const totalIncome = data.product_profit * calculateNumberOfBuyers;
      const totalCosts =
        values.ad_act_cost * data.last_ad_day * values.ad_density;
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
      const adType = await this.AdTypeRepository.findOne({
        where: { id: data.ad_type },
      });
      const adModel = await this.fetchAllStats(data);
      const customer = await this.getCustomerByEmail(data.email);
      const key = `K2024${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
      await this.AdAnalysisRepository.createQueryBuilder('analysis')
        .insert()
        .into(AdAnalysisEntity)
        .values({
          ad_type: adType.name,
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

  async getOrderByCustomerEmail(email: string) {
    const customer = await this.getCustomerByEmail(email);
    try {
      return await this.AdAnalysisRepository.find({
        where: { customer_id: customer.id },
      });
    } catch (e) {
      console.error(e);
    }
  }
  async getAllAdTypes() {
    try {
      return await this.AdTypeRepository.find();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getAdInfoById(id: number) {
    try {
      return await this.AdTypeRepository.findOne({ where: { id: id } });
    } catch (e) {
      console.log(e);
      return 'Тип реклами не знайдено';
    }
  }
}
