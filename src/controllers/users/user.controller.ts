import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/domain/users";
import { UserEntity } from "src/domain/users/entity"; 
import { UserResponseDto, CreateUserDto, ActivateUserDto } from "./dto";

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Get('/')
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all users / empty array' })
  public async findAll(): Promise<UserEntity[]> {
    const result: UserEntity[] = await this._service.findAll();

    return result.map(user => new UserResponseDto(user));
  }

  @Get('/:name')
  @ApiResponse({ status: HttpStatus.OK, description: 'Gets user' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found'})
  public async findByName(@Param('name') name: string): Promise<UserEntity> {
    const result: UserEntity = await this._service.findByName(name);

    return new UserResponseDto(result);
  }

  @Post('/create')
  @ApiResponse({ status: HttpStatus.OK, description: 'Creates new user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Class validator failure' })
  public async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    const result: UserEntity = await this._service.create(data);

    return new UserResponseDto(result);
  }

  @Post('/activate')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Gets user' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Code is already used' })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'User not found / already activated' 
  })
  public async activate(@Body() data: ActivateUserDto): Promise<UserEntity> {
    const result = await this._service.activateViaCode(data);

    return new UserResponseDto(result);
  }
}