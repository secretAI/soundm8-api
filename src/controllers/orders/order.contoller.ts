import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderService } from "../../domain/orders";
import { CreateOrderDto } from "./dto";

@Controller('/orders')
export class OrderController {
  constructor(private readonly _service: OrderService) {}

  @Post('/create')
  public async createOrder(data: CreateOrderDto) {
    console.log(data);
    return await this._service.create(data);
  }
}