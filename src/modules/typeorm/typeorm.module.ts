import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config';
import { TypeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    NestTypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      imports: [ ConfigModule ],
    }),
  ],
})
export class TypeOrmModule {}
