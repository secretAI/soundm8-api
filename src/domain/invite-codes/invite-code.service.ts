import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generate } from 'randomstring';
import { InviteCodeEntity } from '../../domain/invite-codes/entity';
import { ISetInviteCodeStatusData } from './types';
import { UserEntity } from '../users/entity';
import { UserService } from '../users';

@Injectable()
export class InviteCodeService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
    @InjectRepository(InviteCodeEntity)
    private readonly _repository: Repository<InviteCodeEntity>
  ) {}

  public async findAll(): Promise<InviteCodeEntity[]> {
    const codes: InviteCodeEntity[] = await this._repository.find();
    if (!codes.length) {
      throw new HttpException(
        'Invite codes table is empty',
        HttpStatus.NOT_FOUND
      );
    }

    return codes;
  }

  public async findByBody(body: string): Promise<InviteCodeEntity> {
    const code = await this._repository.findOne({
      where: { body },
    });
    if (!code) {
      throw new HttpException(`Code ${body} not found`, HttpStatus.NOT_FOUND);
    }

    return code;
  }

  public async create(): Promise<InviteCodeEntity> {
    return await this._repository.save({
      body: 'SM8' + generate(15) /* random string w/ length of 15 */,
    });
  }

  public async setUsedStatus(
    data: ISetInviteCodeStatusData
  ): Promise<InviteCodeEntity> {
    const { body, userId } = data;
    const userEntity: UserEntity = await this._userService.findById(userId);
    const codeEntity: InviteCodeEntity = await this.findByBody(body);
    if (codeEntity.is_used) {
      throw new HttpException(
        `Code ${body} is already used`,
        HttpStatus.FORBIDDEN
      );
    }
    codeEntity.is_used = true;
    codeEntity.user = userEntity;

    return await this._repository.save(codeEntity);
  }
}
