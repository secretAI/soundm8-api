import { ApiParam, ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length 
} from "class-validator";

export class ActivateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public username: string;

  @IsNotEmpty()
  @IsString()
  @Length(18, 18)
  @ApiProperty({
    minLength: 18,
    maxLength: 18
  })
  public code: string;
}
