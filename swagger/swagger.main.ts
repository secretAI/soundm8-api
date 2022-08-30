import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger';

export function createSwaggerDoc(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
  .setTitle('Soundm8 API')
  .setVersion('0.0.1')
  .setDescription('Soundm8 API Documentation')
  .addTag('soundm8')
  .build();

  return SwaggerModule.createDocument(app, config);
}