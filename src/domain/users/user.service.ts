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
    const doesExist = Boolean(codeEntity);
    if(!doesExist) {
      throw new HttpException(
        `Code ${code} does not exist`,
        HttpStatus.NOT_FOUND
      );
    }
    userEnity.invite_code = codeEntity;
    userEnity.is_activated = true;
    await this._inviteCodeService.setStatus({
      body: code,
      status: true
    });
    const result = await this._repository.save(userEnity, {
      reload: true
    });
    
    return result;
  }
}