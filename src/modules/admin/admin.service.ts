import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '@modules/admin/entities/admin.entity';
import { Repository } from 'typeorm';
import { AuthDto } from '@dto/auth.dto';
import * as argon from 'argon2';

@Injectable({})
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async signIn(dto: AuthDto) {
    const user = await this.adminRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new ForbiddenException(
        'Sai tài khoản hoặc mật khẩu! Vui lòng đăng nhập lại!',
      );
    }

    const pwMatch = await argon.verify(user.password, dto.password);

    if (!pwMatch) {
      throw new ForbiddenException(
        'Sai tài khoản hoặc mật khẩu! Vui lòng đăng nhập lại!',
      );
    }
    console.log({
      dto,
    });
    return 'Chào mừng admin đã quay trở lại!';
  }
}
