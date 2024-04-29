import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNewUserDto } from '../dto/create-new-user.dto';
import * as bcrypt from 'bcrypt';
import { EditUserDto } from '../dto/edit-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';

@Injectable()
export class AdminService {
  @InjectRepository(UserEntity)
  private UserRepository: Repository<UserEntity>;

  async createNewUserByAdmin(
    CreateNewUser: CreateNewUserDto,
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
}
