import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/type';

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

  async updateUser(id: number, userDetailsParams: UpdateUserParams) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user)
      throw new HttpException('User Not Found!', HttpStatus.BAD_REQUEST);
    return this.userRepository.update(id, userDetailsParams);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user)
      throw new HttpException('User Not Found!', HttpStatus.BAD_REQUEST);
    return this.userRepository.delete(id);
  }
}
