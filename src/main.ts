import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`App is running:\n http://localhost/${port}`)
}
bootstrap();
