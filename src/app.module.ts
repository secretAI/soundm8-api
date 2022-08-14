import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config';
import { TypeOrmModule } from './modules/typeorm';

@Module({
  imports: [ ConfigModule, TypeOrmModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
