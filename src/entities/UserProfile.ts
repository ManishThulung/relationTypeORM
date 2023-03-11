import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_profile')
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
