import { HttpModule } from "@nestjs/axios";
import { forwardRef, Module } from "@nestjs/common";
import { OrderController } from "../../controllers/orders";
import { OrderModule } from "../../domain/orders";
import { ConfigModule, ConfigService } from "../../modules/config";
import { FileService } from "./file.service";

@Module({
  controllers: [ OrderController ],
  providers: [ FileService ],
  exports: [ FileService ],
  imports: [ 
    forwardRef(() => OrderModule), 
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.config.http.timeout,
        maxRedirects: configService.config.http.maxRedirects,
      }),
      inject: [ ConfigService ],
    })
  ]
})
export class FileModule {}
