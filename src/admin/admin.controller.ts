import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { EditUserDto } from './dto/edit-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { CreateNewUserAdminDto } from './dto/create-new-user-admin.dto';
import { LoginToAdminDto } from './dto/login-to-admin.dto';
import { CreateNewAdTypeDto } from './dto/create-new-ad-type.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('admin/createNewUser')
  async createNewUser(@Body() createNewUserDto: CreateNewUserAdminDto) {
    return this.adminService.createNewUserByAdmin(createNewUserDto);
  }

  @Post('admin/editUser')
  async editUser(@Body() editUser: EditUserDto) {
    return this.adminService.editUserByEmail(editUser);
  }

  @Post('admin/deleteUserByEmail')
  async deleteUserByEmail(@Body() email: DeleteUserDto) {
    return this.adminService.deleteUserByEmail(email);
  }

  @Post('admin/loginUserToAdmin')
  async loginUserToAdmin(@Body() login: LoginToAdminDto) {
    return this.adminService.loginToAdmin(login);
  }

  @Post('admin/createNewAdType')
  async createNewAdType(@Body() newAdType: CreateNewAdTypeDto) {
    return this.adminService.createNewAdType(newAdType);
  }
}
