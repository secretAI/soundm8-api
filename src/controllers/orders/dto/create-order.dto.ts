import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { PitchKeyList } from "src/lib";

export class CreateOrderDto {
  @IsUrl()
  @IsNotEmpty()
  public url: string;

  @IsOptional()
  @IsIn(PitchKeyList.uniqueKeys)
  key?: string;

  @IsOptional()
  @IsInt()
  @Min(30) 
  @Max(240)
  bpm?: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}
