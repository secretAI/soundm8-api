import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function generateDocumentation(app: INestApplication): void {
  const config = new DocumentBuilder()
  .setTitle('SoundM8 API')
  .setVersion('0.0.1')
  .setDescription('SoundM8 API Documentation')
  .addTag('Users')
  .addTag('Orders')
  .addTag('Invite Codes')
  .build();
  SwaggerModule.setup('doc', app, SwaggerModule.createDocument(app, config));
}