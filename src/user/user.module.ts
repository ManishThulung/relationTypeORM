import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User';
import { UserProfileEntity } from 'src/entities/UserProfile';
import { PostEntity } from 'src/entities/Post';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserProfileEntity, PostEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
