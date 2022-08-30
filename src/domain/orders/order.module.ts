import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../domain/orders/entity';
import { OrderController } from '../../controllers/orders';
import { FileModule } from '../file/file.module';
import { UserModule } from '../users';
import { OrderService } from './order.service';

@Module({
  controllers: [ OrderController ],
  providers: [ OrderService ],
  exports: [ OrderService ],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => FileModule)
  ]
})
export class OrderModule {}
