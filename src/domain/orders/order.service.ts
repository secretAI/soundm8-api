import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, TableColumn } from "typeorm";
import * as dotenv from "dotenv";
import { OrderEntity } from "src/domain/orders/entity";
import { ICreateOrderData } from "./types";

dotenv.config()

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private _orderRepository: Repository<OrderEntity>,
  ) {}

  public async create(data: ICreateOrderData): Promise<OrderEntity> {
    return await this._orderRepository.save(data);
  }
}