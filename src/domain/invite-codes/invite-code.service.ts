import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InviteCodeEntity, UserEntity } from "src/database/entities";
import { Repository } from "typeorm";
import { generate } from "randomstring";


@Injectable()
export class InviteCodeService {
  constructor(
    @InjectRepository(InviteCodeEntity) 
      private _inviteCodeRepository: Repository<InviteCodeEntity>
  ) {}

  public async generate(): Promise<InviteCodeEntity> {
    const codeBody = generate(15); /* random string */

    return await this._inviteCodeRepository.save({
      body: codeBody
    });
  }
}