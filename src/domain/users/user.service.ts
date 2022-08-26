import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { InviteCodeEntity, InviteCodeService } from "../invite-codes/";
import { ICreateUserData } from "./types";
import { UserEntity } from "src/domain/users/entity";
import { IActivateUserData } from "./types/activate-user.interface";

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => InviteCodeService))
      private readonly _inviteCodeService: InviteCodeService,
    @InjectRepository(UserEntity) 
      private readonly _repository: Repository<UserEntity>
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this._repository.find();
  }

  public async findById(id: string): Promise<UserEntity> {
    return await this._repository.findOne({
      where: { id }
    });
  }

  public async findByName(name: string): Promise<UserEntity> {
    const user = await this._repository.findOne({
      where: { username: name }
    });
    if(!user) {
      throw new HttpException(
        `User @${name} not found`, 
        HttpStatus.NOT_FOUND
      );
    }

    return user;
  }

  public async create(data: ICreateUserData): Promise<UserEntity> {
    return await this._repository.save({
      ...data
    });
  }

  public async activateViaCode(data: IActivateUserData): Promise<UserEntity> {
    const { username, code } = data;
    const codeEntity = await this._inviteCodeService.findByBody(code);
    const userEnity = await this.findByName(username);
    if(userEnity.is_activated) {
      throw new HttpException(
        `@${username}'s account is already activated`,
        HttpStatus.BAD_REQUEST
      );
    }
    await this._inviteCodeService.setUsedStatus({
      body: code,
      userId: userEnity.id
    });
    userEnity.is_activated = true;
    userEnity.invite_code = {
      ...codeEntity,
      is_used: true
    };
    const result = await this._repository.save(userEnity);
    
    return result;
  }
}