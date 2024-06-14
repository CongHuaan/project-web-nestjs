import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class SignUpValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(email: string, args: ValidationArguments) {
    const user = await this.userRepository.findOneBy({ email });
    return !user; // Trả về true nếu email chưa tồn tại
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email $value đã được đăng ký! Vui lòng dùng email khác!';
  }
}