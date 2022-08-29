import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/domain/orders/entity';
import { OrderController } from '../../controllers/orders';
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
    forwardRef(() => UserModule)
  ]
})
export class OrderModule {}
