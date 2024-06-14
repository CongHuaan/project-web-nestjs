import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
// import { SignInDto } from '@modules/auth/auth.dto';
// import { SignUpDto } from '@modules/auth/auth.dto';
import { AuthDto } from '@modules/auth/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const result = await this.authService.signIn(dto);
      // Trường hợp đăng nhập thành công, redirect hoặc render trang home
      return res.redirect('/home');
    } catch (error) {
      // Xử lý khi đăng nhập thất bại
      // Ví dụ: hiển thị lại trang đăng nhập với thông báo lỗi
      return res.render('signin', { errorMessage: error.message });
    }
  }

  @Post('signup')
  async signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
}
