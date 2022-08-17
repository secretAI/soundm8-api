import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteCodeEntity } from "src/database/entities";
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
