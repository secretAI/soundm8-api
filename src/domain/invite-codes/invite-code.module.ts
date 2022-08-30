import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InviteCodeController } from "../../controllers/invite-codes";
import { InviteCodeService } from "../../domain/invite-codes/invite-code.service";
import { InviteCodeEntity } from "../../domain/invite-codes/entity"
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
