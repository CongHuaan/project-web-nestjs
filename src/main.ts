import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setBaseViewsDir(join(__dirname, '..', 'views')); 
  app.use(express.static(join(__dirname, '..', 'views')));
  app.setViewEngine('ejs');
  app.use(cookieParser());
  await app.listen(3333);
}
bootstrap();
