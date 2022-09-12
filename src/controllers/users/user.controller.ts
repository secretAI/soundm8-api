import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserService } from 'src/domain/users';
import { UserEntity } from 'src/domain/users/entity';
import { UserResponseDto, CreateUserDto, ActivateUserDto } from './dto';
import { User } from './';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Get('/')
  @ApiOkResponse({
    description: 'Get all users / empty array',
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Class validator failure' })
  public async findAll(): Promise<UserEntity[]> {
    const result: UserEntity[] = await this._service.findAll();

    return result.map((user) => new UserResponseDto(user));
  }

  @Get('/:name')
  @ApiOkResponse({ description: 'Gets user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Class validator failure' })
  public async findByName(@Param('name') name: string): Promise<UserEntity> {
    const result: UserEntity = await this._service.findByName(name);

    return new UserResponseDto(result);
  }

  @Post('/create')
  @ApiCreatedResponse({ description: 'Creates new user' })
  @ApiBadRequestResponse({ description: 'Class validator failure' })
  public async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    const result: UserEntity = await this._service.create(data);

    return new UserResponseDto(result);
  }

  @Post('/activate')
  @ApiOkResponse({ description: 'Gets user' })
  @ApiForbiddenResponse({ description: 'Code is already used' })
  @ApiBadRequestResponse({ description: 'Class validator failure' })
  @ApiBadRequestResponse({ description: 'User not found / already activated' })
  public async activate(@Body() data: ActivateUserDto): Promise<UserEntity> {
    const result = await this._service.activateViaCode(data);

    return new UserResponseDto(result);
  }
}
