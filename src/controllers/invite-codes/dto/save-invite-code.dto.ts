import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length 
} from "class-validator";

export class SaveInviteCodeDto {
  @IsNotEmpty()
  public username: string;

  @IsOptional()
  @IsString()
  @Length(16, 16)
  public body: string;
}
