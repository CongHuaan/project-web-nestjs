import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "@modules/course/entities/course.entity";
import { Repository } from "typeorm";

@Injectable({})

export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
      ) {}


    async createCourse(dto) {
        const course = this.courseRepository.create(dto);
        await this.courseRepository.save(course);
        return course;
    }
    async getAllCourses() {
        return this.courseRepository.find();
    }
    async getCourseById(id) {
        return this.courseRepository.findOne(id);
    }
    async updateCourse(id, dto) {
        await this.courseRepository.update(id, dto);
        return this.courseRepository.findOne(id);
    }
    async deleteCourse(id) {
        const course = await this.courseRepository.findOne(id);
        await this.courseRepository.remove(course);
        return course;
    }
}