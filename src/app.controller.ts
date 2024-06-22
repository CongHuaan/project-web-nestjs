import { Public } from '@modules/auth/decorator/public.decorator';
import { AuthGuard } from '@modules/auth/guard/auth.guard';
import { Course } from '@modules/course/entities/course.entity';
import { GetUser } from '@modules/user/decorator/get-user.decorator';
import { User } from '@modules/user/entities/user.entity';
import { Controller, Get, Redirect, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {

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

  @Get('home')
  @Render('index.ejs') 
  HomePage(@GetUser() user: User, @Req() request: Request) {
    console.log(user);
    const courseData = request.cookies['courseData'];
    return {user, courseData};
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
  AdminCoursePage(@Req() request: Request) {
    const name = request.cookies['name'];
    const courseData = request.cookies['courseData'];
    console.log(name);
    return {name, courseData};
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
  AdminUserPage(@Req() request: Request) {
    return {
      userData: request.cookies['userData']
    }
  }
}
