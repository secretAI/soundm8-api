import { ApiProperty } from "@nestjs/swagger";
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
import { Bitrate, Codec, CommonBitrates, Extension, KnownCodecs, KnownExtensions, PitchKey, PitchKeyList } from "../../../lib";

export class CreateOrderDto {
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  public url: string;

  @IsOptional()
  @IsIn(PitchKeyList)
  @ApiProperty({
    enum: PitchKeyList,
    required: false
  })
  key?: PitchKey;

  @IsOptional()
  @IsInt()
  @Min(30) 
  @Max(240)
  @ApiProperty({
    minimum: 30,
    maximum: 240,
    required: false
  })
  bpm?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsOptional()
  @IsIn(KnownCodecs)
  @ApiProperty({
    enum: KnownCodecs,
    required: false
  })
  codec?: Codec;

  @IsOptional()
  @IsIn(KnownExtensions)
  @ApiProperty({
    enum: KnownExtensions,
    required: false
  })
  ext?: Extension;

  @IsOptional()
  @IsIn(CommonBitrates)
  @ApiProperty({
    enum: CommonBitrates,
    required: false
  })
  bitrate?: Bitrate;
}
