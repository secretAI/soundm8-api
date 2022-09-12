import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AudioService } from 'src/domain/audio/audio.service';
import { OrderEntity } from 'src/domain/orders/entity';
import { OrderService } from '../../domain/orders';
import { CreateOrderDto, OrderResponseDto } from './dto';

@ApiTags('Orders')
@Controller('/orders')
export class OrderController {
  constructor(
    private readonly _orderService: OrderService,
    @Inject(forwardRef(() => AudioService))
    private readonly _audioService: AudioService
  ) {}

  @ApiOkResponse({ description: 'Creates order' })
  @ApiBadRequestResponse({ description: 'Class validator failure' })
  @Post('/create')
  public async createOrder(@Body() data: CreateOrderDto): Promise<OrderEntity> {
    const result = await this._orderService.create(data);

    return new OrderResponseDto(result);
  }

  @Post('test')
  public async test(@Body() data: { url: string }) {
    // const result = 1;
    const result = await this._audioService.processUrl(data.url);
    console.log(result);

    return result;
  }

  /* 
  @Post('/test')
  public async getAudioTrack(@Body() data: GetAudioTrackDto) {
    const result = await this._AudioService.sendApiRequest(data);
    console.log(result);
    
    return result;
  } 
  */
}
