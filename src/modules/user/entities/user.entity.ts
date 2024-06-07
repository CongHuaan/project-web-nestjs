import { Exclude } from 'class-transformer';
import { Course } from '@modules/course/entities/course.entity'; // Đảm bảo rằng đường dẫn tới entity Course là đúng
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  wallet: number;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
