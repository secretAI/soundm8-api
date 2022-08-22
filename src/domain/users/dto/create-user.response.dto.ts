import { 
  IsDate,
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUUID, 
  Length, 
  UUIDVersion
} from "class-validator";
import { UserEntity } from "src/database/entities";

export class UserResponseDto {
  constructor(data: UserEntity) {
    this.id = data.id;
    this.username = data.username;
    this.telegram_id = data.telegram_id;
    this.created_at = data.created_at;
  }

  @IsUUID(4 as UUIDVersion)
  public id: string;

  @IsNotEmpty()
  @Length(6, 48)
  @IsEmail()
  public username: string;

  @IsOptional()
  @IsString()
  @Length(6, 12)
  public telegram_id: number;

  @IsNotEmpty()
  @IsDate()
  public created_at: Date;
}
