import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length 
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 36)
  public inviteCode: string;

  @IsOptional()
  @IsString()
  @Length(6, 12)
  public telegram_id: string;
}
