import { forwardRef, Logger, Module } from '@nestjs/common';
import { OrderController } from '../../controllers/orders';
import { OrderModule } from '../orders';
import { ConfigModule, ConfigService } from '../../modules/config';
import { AudioService } from './audio.service';

@Module({
  controllers: [OrderController],
  providers: [AudioService, Logger],
  exports: [AudioService],
  imports: [
    forwardRef(() => OrderModule),
    ConfigModule
  ],
})
export class AudioModule {}
