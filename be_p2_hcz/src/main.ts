import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }),
  );


  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });


  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Servidor corriendo en: http://localhost:${port}/api/v1/`);
}
bootstrap();
