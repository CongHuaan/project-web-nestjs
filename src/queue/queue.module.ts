import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailProducer } from './producers/mail.producer';
import { MailConsumer } from './consumers/mail.consumer';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          port: config.get('SMTP_PORT'),
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'mailer-queue',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [MailProducer, MailConsumer],
  exports: [MailProducer],
})
export class QueueModule {}
