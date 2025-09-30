import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX || 'api';

  const config = new DocumentBuilder()
    .setTitle('Quiz API')
    .setDescription('API for managing quizzes, questions, and answers')
    .setVersion('1.0')
    .addTag('quizzes')
    .build();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL]
        : ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, '0.0.0.0');

  if (process.env.NODE_ENV !== 'production') {
    Logger.log(
      `Application is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`,
      'Bootstrap',
    );
    Logger.log(
      `Swagger documentation available at: http://localhost:${PORT}/docs`,
      'Bootstrap',
    );
  }
}

bootstrap();
