import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Sendrum API')
      .setDescription('The Global API Documentation for sendrum')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-documentation', app, document);
  }

  await app.listen(3000);
}
bootstrap();
