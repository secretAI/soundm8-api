import { 
  IsFQDN,
  IsIn, 
  IsInt, 
  IsNotEmpty, 
  IsOptional, 
  IsString,
  IsUrl,
  Max, 
  Min 
} from "class-validator";
import { PitchKey, PitchKeyList } from "src/lib";

export class CreateOrderDto {
  @IsUrl()
  @IsNotEmpty()
  public url: string;

  @IsOptional()
  @IsIn(PitchKeyList)
  key?: PitchKey;

  @IsOptional()
  @IsInt()
  @Min(30) 
  @Max(240)
  bpm?: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}
