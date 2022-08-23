import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteCodeController } from "src/controllers/invite-codes";
import { InviteCodeService } from "src/domain/invite-codes/invite-code.service";
import { InviteCodeEntity } from "src/domain/invite-codes/entity"
import { UserModule } from "../users";

@Module({
  controllers: [ InviteCodeController ],
  providers: [ InviteCodeService ],
  exports: [ InviteCodeService ],
  imports: [
    TypeOrmModule.forFeature([
      InviteCodeEntity
    ]),
    forwardRef(() => UserModule)
  ]
})
export class InviteCodeModule {}
