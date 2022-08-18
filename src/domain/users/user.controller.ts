import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserEntity } from "src/database/entities";
import { UserService } from "src/domain/users";
import { UserResponseDto, CreateUserDto } from "./dto";

@Controller('/users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/')
  public async findAll(): Promise<UserResponseDto[]> {
    const response: UserEntity[] = await this._userService.findAll();

    return response.map(user => new UserResponseDto(user));
  }

  @Get('/:id')
  public async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const response: UserEntity = await this._userService.findById(id);

    return new UserResponseDto(response);
  }

  @Post('/new')
  public async create(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    const response: UserEntity = await this._userService.create(data);

    return new UserResponseDto(response);
  }
}