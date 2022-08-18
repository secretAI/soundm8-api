import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../../database/entities";
import { ICreateUserData } from "./types";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>
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
    return await this._userRepository.findOne({
      where: { username: name }
    });
  }

  public async create(data: ICreateUserData): Promise<UserEntity> {
    return await this._userRepository.save(data);
  }
}