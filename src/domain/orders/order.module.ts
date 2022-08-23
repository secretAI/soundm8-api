import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/domain/orders/entity';
import { OrderController } from '../../controllers/orders';
import { OrderService } from './order.service';

@Module({
  controllers: [ OrderController ],
  providers: [ OrderService ],
  exports: [ OrderService ],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity
    ])
  ]
})
export class OrderModule {}
