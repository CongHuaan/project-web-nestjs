import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '@modules/admin/entities/admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '@modules/user/entities/user.entity';
import { Course } from '@modules/course/entities/course.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User, Course]), JwtModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
