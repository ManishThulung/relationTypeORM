import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(name: string, password: string) {
    console.log('Inside validate strategy');
    console.log(name, password);

    const user = await this.authService.validateUser(name, password);
    if (!user)
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    return user;
  }
}
