import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '@modules/course/entities/course.entity';
import { Bill } from '@modules/bill/entities/bill.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Bill])],
})
export class CourseModule {}
