import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity, UserEntity } from 'src/database/entities';
import { OrderController } from './order.contoller';
import { OrderService } from './order.service';

@Module({
  controllers: [ 
    OrderController 
  ],
  providers: [
    OrderService
  ],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity
    ])
  ]
})
export class OrderModule {}
