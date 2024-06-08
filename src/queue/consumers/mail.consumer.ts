import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Processor('mailer-queue')
export class MailConsumer {
  constructor(
    private config: ConfigService,
    private mailService: MailerService,
  ) {}

  @Process('send-mail')
  async sendMail(job: Job<any>) {
    const { data } = job;
    console.log(data);
    try {
      await this.mailService.sendMail({
        to: data.to,
        subject: data.subject,
        text: data.text,
      });
      console.log(`Email sent to ${data.to} with subject ${data.subject}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

}
