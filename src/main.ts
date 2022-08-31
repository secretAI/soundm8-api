import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { generateDocumentation } from '../swagger';
import { AppModule } from './app.module';

dotenv.config();
const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); /* pipe for class-validator */
  generateDocumentation(app); /* swagger */

  await app.listen(port);
  console.log(`(￣▽￣)ノ\nAPI -> http://localhost:${port}/\nDocs -> http://localhost:${port}/doc`);
};
bootstrap();
