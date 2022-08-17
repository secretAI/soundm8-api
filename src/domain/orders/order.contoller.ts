import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from ".";

@Controller() /* fix base url */
export class OrderController {
  constructor(private readonly _service: OrderService) {}

  
}