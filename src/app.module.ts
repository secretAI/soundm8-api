import { Module } from '@nestjs/common';
import { InviteCodeModule } from 'src/domain/invite-codes';
import { OrderModule } from 'src/domain/orders';
import { UserModule } from 'src/domain/users';
import { ConfigModule } from 'src/modules/config';
import { TypeOrmModule } from 'src/modules/typeorm';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { 
  HttpErrorFilterProvider, 
  TypeOrmErrorFilterProvider,
  LoggingInterceptorProvider
} from './shared';

@Module({
  imports: [ 
    ConfigModule, 
    TypeOrmModule,
    OrderModule,
    UserModule,
    InviteCodeModule
  ],
  providers: [ 
    HttpErrorFilterProvider,
    TypeOrmErrorFilterProvider,
    LoggingInterceptorProvider,
  ],
})
export class AppModule {}