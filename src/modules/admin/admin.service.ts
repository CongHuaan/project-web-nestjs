import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '@modules/admin/entities/admin.entity';
import { Repository } from 'typeorm';
import { AuthDto } from '@dto/auth.dto';
import { User } from '@modules/user/entities/user.entity';
import { Course } from '@modules/course/entities/course.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signIn(dto: AuthDto) {
    const admin = await this.adminRepository.findOneBy({ email: dto.email });
    if (!admin) {
      throw new ForbiddenException(
        'Sai tài khoản hoặc mật khẩu! Vui lòng đăng nhập lại!',
      );
    }

    const password = await this.adminRepository.findOneBy({
      password: dto.password,
    });

    if (!password) {
      throw new ForbiddenException(
        'Sai tài khoản hoặc mật khẩu! Vui lòng đăng nhập lại!',
      );
    }
    console.log({
      dto,
    });
    return 'admin';
  }

  async getAllCourses() {
    const courses = await this.courseRepository.find();
    return courses;
  }

  async createCourse(course: Course) {
    const newCourse = this.courseRepository.create(course);
    return await this.courseRepository.save(newCourse);
  }

  async getCourseById(courseId: number) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    return course;
  }

  async updateCourse(course: Course) {
    return await this.courseRepository.save(course);
  }

  async deleteCourse(courseId: number) {
    return await this.courseRepository.delete({ id: courseId });
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async deleteUser(userId: number) {
    return await this.userRepository.delete({ id: userId });
  }
}
