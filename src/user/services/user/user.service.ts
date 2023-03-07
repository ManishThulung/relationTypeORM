import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User';
import { CreateUserParams } from 'src/utils/type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  createUser(userDetailsParams: CreateUserParams) {
    return this.userRepository.save(userDetailsParams);
  }
}
