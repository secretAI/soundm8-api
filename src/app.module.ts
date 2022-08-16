import { Module } from '@nestjs/common';
import { OrderModule } from './domain/orders';
import { UserModule } from './domain/users';
import { ConfigModule } from './modules/config';
import { TypeOrmModule } from './modules/typeorm';
import { 
  HttpErrorFilterProvider, 
  TypeOrmErrorFilterProvider 
} from './shared/filters';
import { LoggingInterceptorProvider } from './shared/logging';

@Module({
  imports: [ 
    ConfigModule, 
    TypeOrmModule,
    OrderModule,
    UserModule
  ],
  providers: [ 
    HttpErrorFilterProvider,
    TypeOrmErrorFilterProvider,
    LoggingInterceptorProvider,
  ],
})
export class AppModule {}
