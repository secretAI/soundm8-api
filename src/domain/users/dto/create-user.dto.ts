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

  @IsOptional()
  @IsString()
  @Length(6, 12)
  public telegram_id: number;
}
