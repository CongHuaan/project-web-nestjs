import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  async updateUser(user: User) {
    return await this.userRepository.save(user);
  }
}
