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
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 36)
  public pass: string;

  @IsOptional()
  @IsString()
  @Length(6, 12)
  public telegram_id?: string;
}
