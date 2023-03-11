import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(name: string, password: string) {
    const user = await this.userService.findUserByUsername(name);
    console.log(user);

    if (!user)
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    if (user.password !== password)
      throw new HttpException('Incorrect password!', HttpStatus.BAD_REQUEST);
    return user;
  }
}
