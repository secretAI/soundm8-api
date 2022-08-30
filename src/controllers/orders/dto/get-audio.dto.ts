import { IsFQDN, IsString } from "class-validator";

export class GetAudioTrackDto {
  @IsString()
  @IsFQDN()
  public url: string;
}
