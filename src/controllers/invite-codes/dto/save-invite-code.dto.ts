import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length, 
  Matches
} from "class-validator";

export class SaveInviteCodeDto {
  @IsNotEmpty()
  public username: string;

  @Matches(/^SM8(\w{15})$/gm)
  @IsOptional()
  @IsString()
  @Length(18, 18)
  public body: string;
}
