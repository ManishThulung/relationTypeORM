import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User';
import {
  CreateUserParams,
  CreateUserPostParams,
  UpdateUserParams,
} from 'src/utils/type';
import { CreateUserProfile } from 'src/user/dtos/CreateUserProfile.dto';
import { UserProfileEntity } from 'src/entities/UserProfile';
import { PostEntity } from 'src/entities/Post';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private readonly userProfileRepository: Repository<UserProfileEntity>,
    @InjectRepository(PostEntity)
    private readonly userPostRepository: Repository<PostEntity>,
  ) {}

  getUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
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

  async findUserByUsername(name: string) {
    console.log('findUserByUsername');

    return await this.userRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async createUserProfile(id: number, createUserProfile: CreateUserProfile) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User Not Found!', HttpStatus.BAD_REQUEST);

    const profile = await this.userProfileRepository.save(createUserProfile);
    user.profile = profile;
    return this.userRepository.save(user);
  }

  async createUserPost(id: number, createUserPost: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);

    return this.userPostRepository.save({ ...createUserPost, user });
    // user.posts = post;
    // await this.userRepository.save(user);
  }
}
