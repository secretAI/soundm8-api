import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InviteCodeEntity } from "src/domain/invite-codes/entity";
import { 
  InviteCodeResponseDto, 
  SaveInviteCodeDto 
} from "./dto";
import { InviteCodeService } from "src/domain/invite-codes/invite-code.service";


@Controller('/codes')
export class InviteCodeController {
  constructor(
    private readonly _service: InviteCodeService
    ) {}

  @Get('/')
  public async findAll(): Promise<InviteCodeResponseDto[]> {
    const result = await this._service.findAll();

    return result.map(code => new InviteCodeResponseDto(code));
  }

  @Get('/generate')
  public async create(): Promise<InviteCodeResponseDto> {   
    const result: InviteCodeEntity = await this._service.create();

    return new InviteCodeResponseDto(result);
  }

  @Get('/:body')
  public async findByBody(@Param('body') body: string): Promise<InviteCodeResponseDto> {    
    const result: InviteCodeEntity = await this._service.findByBody(body);

    return new InviteCodeResponseDto(result);
  }
}