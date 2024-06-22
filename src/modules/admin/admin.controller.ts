import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthDto } from '@modules/auth/auth.dto';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { Public } from '@modules/auth/decorator/public.decorator';
import { Course } from '@modules/course/entities/course.entity';

@Public()
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('signin')
  async signIn(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const result = await this.adminService.signIn(dto);
      const cousreData = await this.adminService.getAllCourses();
      const userData = await this.adminService.getAllUsers();
      console.log(cousreData);
      res.cookie('name', result, { httpOnly: true });
      res.cookie('courseData', cousreData, { httpOnly: true });
      res.cookie('userData', userData, { httpOnly: true });
      return res.redirect('/adminHome');
    } catch (error) {
      return res.render('signin', { errorMessage: error.message });
    }
  }

  @Post('createCourse')
  async createCourse(@Body() courseData: any, @Res() res: Response) {
    try {
      const { name, description, price } = courseData;
      const course = new Course();
      course.name = name;
      course.description = description;
      course.price = price;
      course.slb = 0;
      console.log(course);
      await this.adminService.createCourse(course);
      res.clearCookie('courseData');
      const cousreData = await this.adminService.getAllCourses();
      res.cookie('courseData', cousreData, { httpOnly: true });
      return res.redirect('/adminCourse');
    } catch (error) {
      return res.render('admin_course', { errorMessage: error.message });
    }
  }

  @Get('editCourse/:id')
  async editCourse(@Param('id') id: number, @Res() res: Response) {
    const course = await this.adminService.getCourseById(id);
    res.cookie('course', course, { httpOnly: true });
    console.log(course);
    res.redirect('/adminEditCourse');
  }

  @Post('updateCourse/:id')
  async updateCourse(
    @Param('id') id: number,
    @Body() courseData: any,
    @Res() res: Response,
  ) {
    const { name, description, price } = courseData;
    const course = await this.adminService.getCourseById(id);
    course.name = name;
    course.description = description;
    course.price = price;
    await this.adminService.updateCourse(course);
    res.clearCookie('courseData');
    const cousreData = await this.adminService.getAllCourses();
    res.cookie('courseData', cousreData, { httpOnly: true });
    return res.redirect('/adminCourse');
  }

  @Post('deleteCourse/:id')
  async deleteCourse(@Param('id') id: number, @Res() res: Response) {
    await this.adminService.deleteCourse(id);
    res.clearCookie('courseData');
    const cousreData = await this.adminService.getAllCourses();
    res.cookie('courseData', cousreData, { httpOnly: true });
    return res.redirect('/adminCourse');
  }

  @Post('deleteUser/:id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    await this.adminService.deleteUser(id);
    res.clearCookie('userData');
    const userData = await this.adminService.getAllUsers();
    res.cookie('userData', userData, { httpOnly: true });
    return res.redirect('/adminUser');
  }

  // @Get('course')
  // async getAllCourses(@Res() res: Response) {
  //   // const courses = this.adminService.getAllCourses();
  //   res.render('admin_course');
  // }

  // @Get('createCourse')
  // async createCoruse(@Res() res: Response) {
  //   // const courses = this.adminService.getAllCourses();
  //   res.render('admin_create_course');
  // }
}
