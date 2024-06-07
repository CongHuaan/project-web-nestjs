import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { CourseModule } from '@modules/course/course.module';
import { AdminModule } from '@modules/admin/admin.module';
import { DatabaseModule } from '@module/database.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
