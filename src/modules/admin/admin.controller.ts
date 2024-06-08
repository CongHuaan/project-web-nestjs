import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from '@modules/auth/auth.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.adminService.signIn(dto);
  }
}
