import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash, genSalt } from "bcrypt";
import * as dotenv from "dotenv";
import { UserEntity } from "../../database/entities";
import { ICreateUserData } from "./types";

dotenv.config()

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this._userRepository.find();
  };

  public async findById(id: string): Promise<UserEntity> {
    return await this._userRepository.findOne({
      where: { id }
    })
  }

  public async create(data: ICreateUserData): Promise<UserEntity> {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const salt = await genSalt(saltRounds);
    const hashedPass = await hash(data.pass, salt);
    data.pass = hashedPass;
    const record: UserEntity = await this._userRepository.save(data);
    
    return record;
  };
}