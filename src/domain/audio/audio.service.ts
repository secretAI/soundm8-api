import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ytdl, { videoFormat, videoInfo } from 'ytdl-core';
import { HttpService } from "@nestjs/axios";
import { createWriteStream, unlink } from "fs";
import { ConfigService } from "src/modules/config";
import { IGetPitchKeyData } from "./types";
import { OrderService } from "../orders";
import { YIN } from 'pitchfinder';
import ffmpeg from 'ffmpeg';
import * as path from 'path';
import * as command from 'fluent-ffmpeg';

@Injectable()
export class AudioService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  
  constructor(
    private readonly _config: ConfigService,
    private readonly _httpService: HttpService,
    @Inject(forwardRef(() => OrderService))
      private readonly _orderService: OrderService,
  ) {
    this.apiUrl = this._config.config.sonicApi.url;
    this.apiKey = this._config.config.sonicApi.apiKey;
  }

  private getOptimalVideoFormat(info: videoInfo): videoFormat {
    const formats: videoFormat[] = ytdl.filterFormats(info.formats, 'audio');
    console.log(0, formats);

    return formats.sort((form: videoFormat, form_: videoFormat) => form_.audioBitrate - form.audioBitrate)[0]; 
    /* sort DESC, get the highest audio quality  */
  }

  public async createTemporaryStream(url: string): Promise<any>/* ToDo: fix type */ {
    if(!ytdl.validateURL(url)) {
      throw new HttpException(
        'Invalid Youtube Video URL',
        HttpStatus.BAD_REQUEST
      );
    }

    return new Promise(async (resolve, reject) => {
      const info: videoInfo = await ytdl.getInfo(url);
      const format: videoFormat = this.getOptimalVideoFormat(info);
      console.log('you choose', format);
      const _buffer: Buffer[] = [];
      return ytdl(url, { format })
      .pipe(createWriteStream(`${path.join(__dirname, '_.mp4')}`))
      .on('finish', async () => {
        try {
          unlink(`${info.videoDetails.author.name}.mp3`, () => { console.log('Temporary file removed') });
          const video = (await new ffmpeg(`${path.join(__dirname, '_.mp4')}`))
            .setAudioCodec('opus')
            // .setAudioBitRate(format.audioBitrate || 128)
            // .setAudioQuality(Number(format.audioQuality) || 128)
          
          await video.fnExtractSoundToMP3(`${info.videoDetails.author.name}`);
          console.log(1222222, video);
          // unlink(`${info.videoDetails.author.name}.mp3`, () => { console.log('Temporary file removed') });
          // (err: Error, video) => {
          //   if(err) {
          //     throw err;
          //   }
          //   // video.setAudioCodec('opus');
          //   // video.setAudioBitRate(320);
          //   // video.setAudioQuality(320);
          //   video.fnExtractSoundToMP3(`_.mp3`);
          resolve(1)
        } catch(err) {
          throw err;
        }
      })
      .on('error', (err) => {
        reject(err);
      })
    });
  }

  public async getAudioPitchKey(data: IGetPitchKeyData): Promise<any> {
    try {
      // const buffer = await this.extractAudioBufferByUrl(data.url);    
      // const audioData = new Float32Array(buffer);
      // const getPitchKey = Macleod({
      //   bufferSize: buffer.length
      // });
      // const frequency = getPitchKey(audioData); 
      // console.log(frequency);
  
      return 1;
    } catch(err) {
      throw err;
    }
  }
}
