import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "src/domain/users";
import { UserEntity } from "src/domain/users/entity"; 
import { UserResponseDto, CreateUserDto, ActivateUserDto } from "./dto";

@Controller('/users')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Get('/')
  public async findAll(): Promise<UserEntity[]> {
    const result: UserEntity[] = await this._service.findAll();

    return result.map(user => new UserResponseDto(user));
  }

  @Get('/:name')
  public async findByName(@Param('name') name: string): Promise<UserEntity> {
    const result: UserEntity = await this._service.findByName(name);

    return new UserResponseDto(result);
  }

  @Post('/create')
  public async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    const result: UserEntity = await this._service.create(data);

    return new UserResponseDto(result);
  }

  @Post('/activate')
  public async activate(@Body() data: ActivateUserDto): Promise<UserEntity> {
    const result = await this._service.activateViaCode(data);

    return new UserResponseDto(result);
  }
}