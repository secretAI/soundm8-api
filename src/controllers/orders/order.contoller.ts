import { Body, Controller, forwardRef, Get, Inject, Post, Req } from "@nestjs/common";
import { Request } from 'express';
import { FileService } from "src/domain/file/file.service";
import { OrderService } from "../../domain/orders";
import { CreateOrderDto, GetAudioTrackDto, OrderResponseDto } from "./dto";

@Controller('/orders')
export class OrderController {
  constructor(
    private readonly _orderService: OrderService,
    @Inject(forwardRef(() => FileService))
      private readonly _fileService: FileService
  ) {}

  @Post('/create')
  public async createOrder(@Body() data: CreateOrderDto): Promise<OrderResponseDto> {
    const result = await this._orderService.create(data)
    
    return new OrderResponseDto(result);
  }

  @Post('/file/audio')
  public async getAudioTrack(@Body() data: GetAudioTrackDto) {
    const result = await this._fileService.getAudioTrackBuffer(data.url);

    return result;
  }
}