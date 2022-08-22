import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InviteCodeEntity, UserEntity } from "../../database/entities";
import { InviteCodeService } from "../invite-codes/invite-code.service";
import { ICreateUserData } from "./types";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>,
    private readonly _inviteCodeService: InviteCodeService
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this._userRepository.find();
  }

  public async findById(id: string): Promise<UserEntity> {
    return await this._userRepository.findOne({
      where: { id }
    });
  }

  public async findByName(name: string): Promise<UserEntity> {
    const user = await this._userRepository.findOne({
      where: { username: name }
    });
    if(!user) {
      throw new HttpException(`User @${name} not found`, HttpStatus.NOT_FOUND)
    }

    return user;
  }

  public async create(data: ICreateUserData): Promise<UserEntity> {
    // const code = await this._inviteCodeService.generate();
    return await this._userRepository.save({
      // invite_code: code,
      ...data
    });
  }
}