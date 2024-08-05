import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import Logging from './library/Logging';
import { AppModule } from './app.module';

// Use require to import cookie-parser
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // Use cookie-parser middleware
  app.use(cookieParser());

  // Setup to display files
  app.use('/files', express.static('files'));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS tutorial API')
    .setDescription('This is API for NestJS tutorial')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const PORT = process.env.PORT || 8080;
  await app.listen(PORT);

  Logging.log(`App is listening on: ${await app.getUrl()}`);
}

bootstrap();
