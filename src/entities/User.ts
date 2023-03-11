import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserProfileEntity } from './UserProfile';
import { PostEntity } from './Post';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  profile: UserProfileEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
