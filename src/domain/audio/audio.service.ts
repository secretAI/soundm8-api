import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import ytdl, { videoFormat, videoInfo } from 'ytdl-core';
import { HttpService } from "@nestjs/axios";
import { createWriteStream, unlink, unlinkSync } from "fs";
import { ConfigService } from "src/modules/config";
import { IExtractAudioData, IGetPitchKeyData } from "./types";
import { OrderService } from "../orders";
import { YIN } from 'pitchfinder';
import ffmpeg from 'ffmpeg';
import * as path from 'path';
import command from 'fluent-ffmpeg';
import { ChildProcess, exec, ExecException } from 'child_process';

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

  public async processUrl(url: string): Promise<void>/* ToDo: fix type */ {
    if(!ytdl.validateURL(url)) {
      throw new HttpException(
        'Invalid Youtube Video URL',
        HttpStatus.BAD_REQUEST
      );
    }

    return new Promise(async (resolve, reject) => {
      const fileName = Date.now() + '_';
      const info: videoInfo = await ytdl.getInfo(url);
      const format: videoFormat = this.getVideoFormat(info);

      return ytdl(url, { format })
      .pipe(createWriteStream(fileName + '.mp4'))
      .on('error', (err) => { reject(err) })
      .on('finish', async () => {
        this.extractAudio({
          bitrate: 320,
          inputName: fileName,
          outputName: fileName
        });
        console.log(`Audio available as: ${fileName}.mp3`);

        resolve();
      })
    });
  }

  private getVideoFormat(info: videoInfo): videoFormat {
    const formats: videoFormat[] = ytdl.filterFormats(info.formats, 'audio');

    return formats.sort((formatA: videoFormat, formatB: videoFormat) => {
      return formatB.audioBitrate - formatA.audioBitrate;
    })[0]; 
    /* sort DESC, get the highest audio bitrate available ⬆️  */
  }

  private extractAudio(data: IExtractAudioData): void {
    const { bitrate, inputName, outputName } = data;
    const process: ChildProcess = exec(`ffmpeg -i ${inputName}.mp4 -vn -acodec mp3 -ab ${bitrate || 128}k -ar 44100 -ac 2 ${outputName}.mp3`, 
    (err: ExecException, stdout: string, stderr: string) => {
      const error = err || stderr;
      if(error) {
        console.error(error);
        throw error;
      }
      console.log(stdout);
    });

    process.on('exit', () => {
      unlinkSync(inputName + '.mp4');
    })
  }
}
