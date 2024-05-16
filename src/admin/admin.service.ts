import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EditUserDto } from './dto/edit-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { CreateNewUserAdminDto } from './dto/create-new-user-admin.dto';
import { AdAnalysisEntity } from '../entities/ad-analysis.entity';
import { LoginToAdminDto } from './dto/login-to-admin.dto';
import { CreateNewAdTypeDto } from './dto/create-new-ad-type.dto';
import { AdTypeEntity } from '../entities/ad-type.entity';

@Injectable()
export class AdminService {
  @InjectRepository(UserEntity)
  private UserRepository: Repository<UserEntity>;

  @InjectRepository(AdAnalysisEntity)
  private AdAnalysisRepository: Repository<AdAnalysisEntity>;

  @InjectRepository(AdTypeEntity)
  private AdTypeRepository: Repository<AdTypeEntity>;

  async createNewUserByAdmin(
    CreateNewUser: CreateNewUserAdminDto,
  ): Promise<boolean> {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(CreateNewUser.password, salt);
      await this.UserRepository.createQueryBuilder('user')
        .insert()
        .into(UserEntity)
        .values({
          email: CreateNewUser.email,
          role: CreateNewUser.role,
          nick_name: CreateNewUser.nick_name,
          password: hashedPassword,
        })
        .execute();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async editUserByEmail(updatedUserData: EditUserDto) {
    try {
      const user = await this.UserRepository.findOne({
        where: { email: updatedUserData.email },
      });

      if (!user) {
        return false;
      }
      if (updatedUserData.nick_name) {
        user.nick_name = updatedUserData.nick_name;
      }
      const editData = this.UserRepository.merge(user, updatedUserData);
      return await this.UserRepository.save(editData);
    } catch (e) {
      return false;
    }
  }

  async deleteUserByEmail(data: DeleteUserDto) {
    try {
      const user = await this.UserRepository.findOne({
        where: { email: data.email },
      });
      if (!user) {
        return false;
      }
      return await this.UserRepository.remove(user);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async loginToAdmin(login: LoginToAdminDto) {
    try {
      const user = await this.UserRepository.findOne({
        where: { email: login.email },
      });
      if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
        return false;
      }

      const isPasswordValid = await bcrypt.compare(
        login.password,
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

  private async getOrderById(orderId: number) {
    try {
      return await this.AdAnalysisRepository.findOne({
        where: { id: orderId },
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async createNewAdType(newAdType: CreateNewAdTypeDto) {
    try {
      await this.AdTypeRepository.createQueryBuilder('ad')
        .insert()
        .into(AdTypeEntity)
        .values({
          name: newAdType.name,
          ad_density: newAdType.ad_density,
          ad_act_cost: newAdType.ad_act_cost,
          coefficient_k: newAdType.coefficient_k,
          ad_number_percent: newAdType.ad_number_percent,
          description: newAdType.description,
        })
        .execute();
      return newAdType;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}