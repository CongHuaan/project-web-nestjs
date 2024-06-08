import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MailProducer {
  constructor(
    @InjectQueue('mailer-queue') private readonly mailerQueue: Queue,
  ) {}

  async sendMail(mail: any) {
    console.log('Sending mail:', mail);
    await this.mailerQueue.add('send-mail', mail);
  }
}
