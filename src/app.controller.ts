import { Public } from '@modules/auth/decorator/public.decorator';
import { AuthGuard } from '@modules/auth/guard/auth.guard';
import { Course } from '@modules/course/entities/course.entity';
import { GetUser } from '@modules/user/decorator/get-user.decorator';
import { User } from '@modules/user/entities/user.entity';
import { Controller, Get, Redirect, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(
    private appService: AppService,
  ){}

  @Public()
  @Get('signin')
  @Render('signin.ejs') 
  SignInPage() {
    return {};
  }

  @Public()
  @Get('signup')
  @Render('signup.ejs') 
  SignUpPage() {
    return {};
  }

  @Public()
  @Get()
  @Render('home.ejs')
  async HomePage() {
    const courseData = await this.appService.getCourse();
    return {courseData};
  }

  @Get('home')
  @Render('index.ejs') 
  async HomeUserPage(@GetUser() user: User) {
    console.log(user);
    const courseData = await this.appService.getCourse();
    return {user, courseData};
  }

  @Get('updateInfor')
  @Render('update_infor.ejs')
  UpdateInforPage(@GetUser() user: User) {
    return {user};
  }

  @Get('naptien')
  @Render('naptien.ejs')
  NaptienPage(@GetUser() user: User) {
    return {user};
  }

  @Get('mykhoahoc')
  @Render('my_khoahoc.ejs')
  async MyKhoahocPage(@GetUser() user: User) {
    const courseInBill = await this.appService.getBill(user.id);
    return {user, courseInBill};
  }

  @Public()
  @Get('admin')
  @Render('admin_signin.ejs')
  AdminSignin() {
    return {};
  }

  @Public()
  @Get('adminHome')
  @Render('admin_home.ejs')
  AdminHomePage() {
    return {};
  }

  @Public()
  @Get('adminCourse')
  @Render('admin_course.ejs')
  async AdminCoursePage() {
    const courseData = await this.appService.getCourse();
    return {courseData};
  }

  @Public()
  @Get('adminCreateCourse')
  @Render('admin_create_course.ejs')
  AdminCreateCoursePage(@Req() request: Request) {
    
  }

  @Public()
  @Get('adminEditCourse')
  @Render('admin_edit_course.ejs')
  AdminEditCoursePage(@Req() request: Request) {
    return {
      course: request.cookies['course']
    }
  }

  @Public()
  @Get('adminUser')
  @Render('admin_user.ejs')
  async AdminUserPage() {
    const userData = await this.appService.getUser();
    return {
      userData
    }
  }
}
