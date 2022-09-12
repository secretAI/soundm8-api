import { IsUrl, IsString, IsNotEmpty } from 'class-validator';

export class GetAudioTrackDto {
  @IsNotEmpty()
  @IsUrl()
  public videoUrl: string;

  @IsNotEmpty()
  @IsString()
  public endPoint: string;
}
