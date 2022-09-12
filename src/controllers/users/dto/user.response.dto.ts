import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  UUIDVersion,
} from 'class-validator';
import { InviteCodeEntity } from '../../../domain/invite-codes/entity';
import { UserEntity } from '../../../domain/users/entity';

export class UserResponseDto {
  constructor(data: UserEntity) {
    this.id = data.id;
    this.username = data.username;
    this.telegram_id = data.telegram_id;
    this.created_at = data.created_at;
    this.is_activated = data.is_activated;
    this.invite_code = data.invite_code || null;
  }

  @IsUUID()
  public id: string;

  @IsString()
  @Length(6, 48)
  public username: string;

  @IsNotEmpty()
  @IsInt()
  @Length(6, 12)
  public telegram_id: number;

  @IsNotEmpty()
  @IsDate()
  public created_at: Date;

  @IsNotEmpty()
  @IsBoolean()
  public is_activated: boolean;

  public invite_code: InviteCodeEntity;
}
