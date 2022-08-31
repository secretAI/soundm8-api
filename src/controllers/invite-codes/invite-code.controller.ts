import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { InviteCodeEntity } from "../../domain/invite-codes/entity";
import { 
  InviteCodeResponseDto, 
} from "./dto";
import { InviteCodeService } from "../../domain/invite-codes/invite-code.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Invite Codes')
@Controller('/codes')
export class InviteCodeController {
  constructor(
    private readonly _service: InviteCodeService
    ) {}

  @Get('/')
  @ApiResponse({ status: HttpStatus.OK, description: 'Gets all codes / empty array' })
  public async findAll(): Promise<InviteCodeResponseDto[]> {
    const result: InviteCodeEntity[] = await this._service.findAll();

    return result.map(code => new InviteCodeResponseDto(code));
  }

  @Get('/generate')
  @ApiResponse({ status: HttpStatus.OK, description: 'Generates new code directly' })
  public async create(): Promise<InviteCodeResponseDto> {   
    const result: InviteCodeEntity = await this._service.create();

    return new InviteCodeResponseDto(result);
  }

  @Get('/:body')
  @ApiResponse({ status: HttpStatus.OK, description: 'Gets code' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Code not found' })
  public async findByBody(@Param('body') body: string): Promise<InviteCodeResponseDto> {    
    const result: InviteCodeEntity = await this._service.findByBody(body);

    return new InviteCodeResponseDto(result);
  }
}