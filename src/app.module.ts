import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { InviteCodeModule } from 'src/domain/invite-codes';
import { OrderModule } from 'src/domain/orders';
import { UserModule } from 'src/domain/users';
import { ConfigModule } from 'src/modules/config';
import { TypeOrmModule } from 'src/modules/typeorm';
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