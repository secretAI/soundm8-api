import { IsUrl, IsString, IsNotEmpty } from "class-validator";
import { SonicApiData } from "../../../domain/audio/types";

export class GetAudioTrackDto {
  @IsNotEmpty()
  @IsUrl()
  public videoUrl: string;

  @IsNotEmpty()
  @IsString()
  public endPoint: string;

  @IsNotEmpty()
  public api: SonicApiData;
}
