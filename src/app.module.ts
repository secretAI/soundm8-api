import { Module } from '@nestjs/common';
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

@Module({
  imports: [ 
    ConfigModule, 
    TypeOrmModule,
    OrderModule,
    UserModule,
    InviteCodeModule,
  ],
  providers: [ 
    HttpErrorFilterProvider,
    TypeOrmErrorFilterProvider,
    LoggingInterceptorProvider,
  ],
})
export class AppModule {}