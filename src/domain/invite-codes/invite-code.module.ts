import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteCodeEntity } from "src/database/entities";
import { ConfigService } from "src/modules/config";
import { RobotModule } from "src/modules/robot/robot.module";
import { RobotService } from "src/modules/robot/robot.service";
import { InviteCodeController } from "./invite-code.controller";
import { InviteCodeService } from "./invite-code.service";

@Module({
  controllers: [
    InviteCodeController
  ],
  providers: [
    InviteCodeService
  ],
  imports: [
    TypeOrmModule.forFeature([
      InviteCodeEntity
    ])
  ]
})
export class InviteCodeModule {}
