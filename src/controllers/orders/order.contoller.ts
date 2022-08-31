import { Body, Controller, forwardRef, Get, HttpStatus, Inject, Post, Req } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileService } from "src/domain/file/file.service";
import { OrderEntity } from "src/domain/orders/entity";
import { OrderService } from "../../domain/orders";
import { CreateOrderDto, GetAudioTrackDto, OrderResponseDto } from "./dto";

@ApiTags('Orders')
@Controller('/orders')
export class OrderController {
  constructor(
    private readonly _orderService: OrderService,
    @Inject(forwardRef(() => FileService))
      private readonly _fileService: FileService
  ) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Creates order' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Class validator failure' })
  @Post('/create')
  public async createOrder(@Body() data: CreateOrderDto): Promise<OrderEntity> {
    const result = await this._orderService.create(data)
    
    return new OrderResponseDto(result);
  }

  /* 
  */
  @Post('/test')
  public async getAudioTrack(@Body() data: GetAudioTrackDto) {
    const result = await this._fileService.sendApiRequest(data);
    console.log(result);
    
    return result;
  } 
}