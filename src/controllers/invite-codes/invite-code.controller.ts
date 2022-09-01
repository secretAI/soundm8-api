import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post 
} from "@nestjs/common";
import { 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiTags 
} from "@nestjs/swagger";
import { InviteCodeEntity } from "../../domain/invite-codes/entity";
import { 
  InviteCodeResponseDto, 
} from "./dto";
import { InviteCodeService } from "../../domain/invite-codes/invite-code.service";

@ApiTags('Invite Codes')
@Controller('/codes')
export class InviteCodeController {
  constructor(
    private readonly _service: InviteCodeService
    ) {}

  @Get('/')
  @ApiOkResponse({ description: 'Gets all codes / empty array' })
  public async findAll(): Promise<InviteCodeResponseDto[]> {
    const result: InviteCodeEntity[] = await this._service.findAll();

    return result.map(code => new InviteCodeResponseDto(code));
  }

  @Get('/generate')
  @ApiOkResponse({ description: 'Generates new code directly' })
  public async create(): Promise<InviteCodeResponseDto> {   
    const result: InviteCodeEntity = await this._service.create();

    return new InviteCodeResponseDto(result);
  }

  @Get('/:body')
  @ApiOkResponse({ description: 'Gets code' })
  @ApiNotFoundResponse({ description: 'Code not found' })
  public async findByBody(@Param('body') body: string): Promise<InviteCodeResponseDto> {    
    const result: InviteCodeEntity = await this._service.findByBody(body);

    return new InviteCodeResponseDto(result);
  }
}