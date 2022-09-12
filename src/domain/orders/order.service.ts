import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, TableColumn } from 'typeorm';
import * as dotenv from 'dotenv';
import { OrderEntity } from '../../domain/orders/entity';
import { ICreateOrderData } from './types';
import { UserService } from '../users';

dotenv.config();

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private _orderRepository: Repository<OrderEntity>,
    @Inject(forwardRef(() => UserService)) private _userService: UserService
  ) {}

  public async create(data: ICreateOrderData): Promise<OrderEntity> {
    /* throws err if user doesn't exists ⬇️ */
    await this._userService.findByName(data.username);

    return await this._orderRepository.save(data);
  }
}
