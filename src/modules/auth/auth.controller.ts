import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  //   async signIn(@Body() dto: AuthDto) {
  //     return this.authService.signIn(dto);
  //   }
  async signIn() {
    return this.authService.signIn();
  }

  @Post('signup')
  //   async signUp(@Body() dto: AuthDto) {
  //     return this.authService.signUp(dto);
  //   }
  async signUp() {
    return this.authService.signUp();
  }
}
