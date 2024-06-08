import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Course } from '@modules/course/entities/course.entity';

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateTime: Date;

    @ManyToOne(() => User, user => user.bills)
    user: User;

    @ManyToOne(() => Course, course => course.bills)
    course: Course;
}