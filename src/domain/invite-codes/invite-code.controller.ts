import { Controller, Get } from "@nestjs/common";
import { InviteCodeEntity } from "src/database/entities";
import { InviteCodeResponseDto } from "./dto";
import { InviteCodeService } from "./invite-code.service";


@Controller('/codes')
export class InviteCodeController {
  constructor(private readonly _inviteCodeService: InviteCodeService) {}

  @Get('/generate')
  public async generate(): Promise<InviteCodeResponseDto> {
    const response: InviteCodeEntity = await this._inviteCodeService.generate();

    return new InviteCodeResponseDto(response);
  }
}