// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { InjectRepository } from '@nestjs/typeorm';
// import * as jwt from 'jsonwebtoken';
// import { User } from '@modules/user/entities/user.entity';
// import { Repository } from 'typeorm';
// import { Reflector } from '@nestjs/core';
// import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private config: ConfigService,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     private reflector: Reflector,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ])
//     if(isPublic) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException(
//         'Invalid or missing authorization header',
//       );
//     }

//     const token = authHeader.split(' ')[1].trim();
//     try {
//       const decoded = jwt.verify(token, this.config.get('JWT_SECRET'));
//       const user = await this.userRepository.findOneBy({
//         email: decoded['email'],
//       });
//       console.log("helllo");
//       console.log(user);
//       request.user = user;
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }
//   }
// }
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from '@modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private config: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token'];
    console.log('Token:', token);

    if (!token) {
      console.log('Missing token');
      throw new UnauthorizedException('Missing token');
    }

    try {
      const decoded = jwt.verify(token, this.config.get('JWT_SECRET'));
      const user = await this.userRepository.findOneBy({
        email: decoded['email'],
      });
      if (!user) {
        console.log('User not found');
        throw new UnauthorizedException('User not found');
      }

      request.user = user;
      return true;
    } catch (error) {
      console.log('Error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
