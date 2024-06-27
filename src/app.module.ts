import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { CourseModule } from '@modules/course/course.module';
import { AdminModule } from '@modules/admin/admin.module';
import { DatabaseModule } from '@module/database.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { QueueModule } from './queue/queue.module';
import { Bill } from '@modules/bill/entities/bill.entity';
import { AppController } from './app.controller';
import { AuthGuard } from '@modules/auth/guard/auth.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Course } from '@modules/course/entities/course.entity';
import { AdminService } from '@modules/admin/admin.service';
import { Admin } from '@modules/admin/entities/admin.entity';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User, Course, Bill, Admin]),
    AuthModule,
    UserModule,
    CourseModule,
    AdminModule,
    DatabaseModule,
    QueueModule,
    MailerModule,
    AdminModule,
    Bill,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Reflector,
    AppService,
    AdminService,
    JwtService,
  ],
})
export class AppModule {}
