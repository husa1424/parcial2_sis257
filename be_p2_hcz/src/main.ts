import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  // Prefijo global
  app.setGlobalPrefix('api');

  // Versionado de API por URI: /api/v1/...
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Habilitar CORS
  app.enableCors();

  // Escuchar puerto definido en .env o 3000 por defecto
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(` Servidor corriendo en: http://localhost:${port}/api/v1/`);
}
bootstrap();

