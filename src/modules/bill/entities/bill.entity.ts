import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Course } from '@modules/course/entities/course.entity';

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateTime: Date = new Date();

    @ManyToOne(() => User, user => user.bills)
    user: User;

    @Column()
    course_id: number
}