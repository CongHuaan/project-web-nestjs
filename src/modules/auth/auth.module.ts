import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailProducer } from 'src/queue/producers/mail.producer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'mailer-queue',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailProducer],
})
export class AuthModule {}
