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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    CourseModule,
    AdminModule,
    DatabaseModule,
    QueueModule,
    MailerModule,
    AdminModule,
    Bill
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
