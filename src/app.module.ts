import { Module } from '@nestjs/common';
import { InviteCodeModule } from './domain/invite-codes';
import { OrderModule } from './domain/orders';
import { UserModule } from './domain/users';
import { ConfigModule } from './modules/config';
import { RobotModule } from './modules/robot/robot.module';
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
    UserModule,
    InviteCodeModule,
    RobotModule
  ],
  providers: [ 
    HttpErrorFilterProvider,
    TypeOrmErrorFilterProvider,
    LoggingInterceptorProvider,
  ],
})
export class AppModule {}
