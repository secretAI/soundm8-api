import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length 
} from "class-validator";

export class ActivateUserDto {
  @IsNotEmpty()
  public username: string;

  @IsOptional()
  @IsString()
  @Length(16, 16)
  public code: string;
}
