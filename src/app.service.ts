import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateNewUserDto } from './dto/create-new-user.dto';

@Injectable()
export class AppService {
  @InjectRepository(UserEntity)
  private UserRepository : Repository<UserEntity>
  getHello(): string {
    console.log("run")
    return 'Hello World!';
  }

  async createNewUser(CreateNewUser: CreateNewUserDto):Promise<boolean> {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(CreateNewUser.password, salt)
      await this.UserRepository
        .createQueryBuilder('user')
        .insert()
        .into(UserEntity)
        .values({
          email: CreateNewUser.email,
          role: CreateNewUser.role,
          nick_name: CreateNewUser.nick_name,
          password: hashedPassword
        })
        .execute();
      return true;
    } catch (e) {
      console.error(e);
      return false
    }
  }

  async login(loginUser: LoginUserDto) {
    try {
      const user = await this.UserRepository.findOne({ where: { email: loginUser.email } });
      if (!user) {
        return false;
      }
      const isPasswordValid = await bcrypt.compare(loginUser.password, user.password);

      return {
        login: isPasswordValid,
        name: user.nick_name,
        role: user.role
      };
    } catch (e) {
      console.log(e)
    }
  }
}
