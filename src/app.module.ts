import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { InviteCodeModule } from './domain/invite-codes';
import { OrderModule } from './domain/orders';
import { UserModule } from './domain/users';
import { ConfigModule } from './modules/config';
import { TypeOrmModule } from './modules/typeorm';
import { 
  HttpErrorFilterProvider, 
  TypeOrmErrorFilterProvider,
  LoggingInterceptorProvider
} from './shared';

dotenv.config();

@Module({
  imports: [ 
    ConfigModule, 
    TypeOrmModule,
    OrderModule,
    UserModule,
    InviteCodeModule
  ],
  providers: process.env.NODE_ENV == 'production' ? [ LoggingInterceptorProvider ] : [ 
    HttpErrorFilterProvider,
    TypeOrmErrorFilterProvider,
    LoggingInterceptorProvider,
  ]
})
export class AppModule {}