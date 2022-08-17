import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserEntity } from "src/database/entities";
import { UserService } from "src/domain/users";
import { UserResponseDto, CreateUserDto } from "./dto";

@Controller('/users')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Get('/')
  public async findAll(): Promise<UserResponseDto[]> {
    const response: UserEntity[] = await this._service.findAll();

    return response.map(user => new UserResponseDto(user));
  }

  @Get('/:id')
  public async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const response: UserEntity = await this._service.findById(id);

    return new UserResponseDto(response);
  }

  @Post('/new')
  public async create(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    const response: UserEntity = await this._service.create(data);

    return new UserResponseDto(response);
  }
}