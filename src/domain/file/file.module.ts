import { forwardRef, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OrderController } from "src/controllers/orders";
import { OrderModule } from "src/domain/orders";
import { ConfigModule } from "src/modules/config";
import { FileService } from "./file.service";


@Module({
  controllers: [ OrderController ],
  providers: [ FileService ],
  exports: [ FileService ],
  imports: [ forwardRef(() => OrderModule), ConfigModule ],
})
export class FileModule {}
