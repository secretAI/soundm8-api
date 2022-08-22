import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, TableColumn } from "typeorm";
import { hash, genSalt } from "bcrypt";
import * as dotenv from "dotenv";
import { OrderEntity } from "../../database/entities";
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