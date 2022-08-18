import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '../config';
import { RobotService } from './robot.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: (_configService: ConfigService) => ({
        token: _configService.config.robot.token
      }),
      inject: [ ConfigService ]
    })
  ],
  providers: [
    RobotService
  ]
})
export class RobotModule {}
