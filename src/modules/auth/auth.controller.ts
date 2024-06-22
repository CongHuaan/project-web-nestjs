import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
// import { SignInDto } from '@modules/auth/auth.dto';
// import { SignUpDto } from '@modules/auth/auth.dto';
import { AuthDto, SignUpDto } from '@modules/auth/auth.dto';
import { Response } from 'express';
import { Public } from './decorator/public.decorator';
import { CourseService } from '@modules/course/course.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private courseService: CourseService,
  ) {}

  @Post('signin')
  async signIn(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const result = await this.authService.signIn(dto);
      res.cookie('token', result.access_token, { httpOnly: true });
      const cousreData = await this.courseService.getAllCourses();
      // cousreData.forEach(course => {
      //   course.formattedPrice = course.price.toLocaleString('vi-VN');
      // });
      res.cookie('courseData', cousreData, { httpOnly: true });
      return res.redirect('/home');
    } catch (error) {
      return res.render('signin', { errorMessage: error.message });
    }
  }

  @Post('signup')
  async signUp(@Body() dto: SignUpDto, @Res() res: Response){
    const result = await this.authService.signUp(dto);
    return res.redirect('/signin');
  }

  @Get('signout')
  async signOut(@Res() res: Response) {
    res.clearCookie('token');
    return res.redirect('/signin');
  }
}
