import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUser } from 'src/user/dtos/CreateUser.dto';
import { CreateUserPost } from 'src/user/dtos/CreateUserPost.dto';
import { CreateUserProfile } from 'src/user/dtos/CreateUserProfile.dto';
import { UpdateUser } from 'src/user/dtos/UpdateUser.dto';
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

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userDetails: UpdateUser) {
    return this.userServices.updateUser(id, userDetails);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userServices.deleteUser(id);
  }

  @Post(':id/profile')
  createProfile(
    @Param('id') id: number,
    @Body() userProfileDetails: CreateUserProfile,
  ) {
    return this.userServices.createUserProfile(id, userProfileDetails);
  }

  @Post(':id/posts')
  createUserPosts(
    @Param('id') id: number,
    @Body() userPostDetails: CreateUserPost,
  ) {
    return this.userServices.createUserPost(id, userPostDetails);
  }
}
