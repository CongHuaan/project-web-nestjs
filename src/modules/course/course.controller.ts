import { Body, Controller, Post, Res } from "@nestjs/common";
import { CourseService } from "@modules/course/course.service";
import { Response } from "express";

@Controller('course')

export class CourseController{
    constructor(private courseService: CourseService) {}

    @Post('getAllCourses')
    async getAllCourse(@Res() res: Response){
        const courseData = await this.courseService.getAllCourses();
        return courseData;
    }
}