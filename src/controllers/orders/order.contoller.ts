import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "../../domain/orders";

@Controller() /* fix base url */
export class OrderController {
  constructor(private readonly _service: OrderService) {}

  
}