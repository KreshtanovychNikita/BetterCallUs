import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNewUserDto } from '../dto/create-new-user.dto';
import { AdminService } from './admin.service';
import { EditUserDto } from '../dto/edit-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('admin/createNewUser')
  async createNewUser(@Body() createNewUserDto: CreateNewUserDto) {
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
}
