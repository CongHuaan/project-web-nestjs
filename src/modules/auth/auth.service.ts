import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, SignUpDto } from '@modules/auth/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { MailProducer } from 'src/queue/producers/mail.producer';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private config: ConfigService,
    private jwt: JwtService,
    private mailProducer: MailProducer,
  ) {}

  async signIn(dto: AuthDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });

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
    return this.signInToken(user.id, user.email);
  }

  async signUp(dto: SignUpDto) {
    console.log(dto);
    const existingUser = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new ForbiddenException(
        'Email đã được đăng ký! Vui lòng dùng email khác!',
      );
    }

    const hash = await argon.hash(dto.password);
    const newUser = this.userRepository.create({
      email: dto.email,
      password: hash,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    await this.userRepository.save(newUser);
    console.log({
      newUser,
    });
    const data = {
      to: dto.email,
      subject: 'Register',
      text: 'Bạn đã đăng ký thành công',
    };
    await this.mailProducer.sendMail(data);
    return this.signInToken(newUser.id, newUser.email);
  }

  async signInToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
