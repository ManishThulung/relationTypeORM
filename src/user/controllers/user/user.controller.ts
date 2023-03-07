import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUser } from 'src/user/dtos/CreateUser.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @Get()
  getUsers() {
    return this.userServices.getUsers();
  }

  @Post()
  createUser(@Body() userDetails: CreateUser) {
    return this.userServices.createUser(userDetails);
  }
}
