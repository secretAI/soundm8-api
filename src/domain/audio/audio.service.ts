import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger, LoggerService, NotImplementedException } from "@nestjs/common";
import ytdl, { videoFormat, videoInfo } from 'ytdl-core';
import { HttpService } from "@nestjs/axios";
import { createWriteStream, unlink, unlinkSync } from "fs";
import { ConfigService } from "src/modules/config";
import { AudioCodec, IExtractAudioData, IGetPitchKeyData } from "./types";
import { OrderService } from "../orders";
import { YIN } from 'pitchfinder';
import { ChildProcess, exec, ExecException, spawn } from 'child_process';

@Injectable()
export class AudioService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly _logger: Logger = new Logger('* AudioService', {
    timestamp: false
  });

  constructor(
    private readonly _config: ConfigService,
    @Inject(forwardRef(() => OrderService))
      private readonly _orderService: OrderService,
  ) {
    this.apiUrl = this._config.config.sonicApi.url;
    this.apiKey = this._config.config.sonicApi.apiKey;
  }

  public async processUrl(url: string): Promise<void> {
    if(!ytdl.validateURL(url)) {
      throw new HttpException(
        'Invalid Youtube Video URL',
        HttpStatus.BAD_REQUEST
      );
    }

    return new Promise(async (resolve, reject) => {
      const fileName = Date.now() + '_';
      const info: videoInfo = await ytdl.getInfo(url);
      const format: videoFormat = this.getHighestAudioFormat(info);

      return ytdl(url, { format })
        .pipe(createWriteStream(fileName + '.mp4'))
        .on('error', (err) => reject(err))
        .on('finish', async () => {
          this.extractAudio({
            bitrate: 320,
            inputName: fileName,
            outputName: fileName,
            codec: 'mp3'
          });
          this._logger.verbose(`Audio available as: ${fileName}.mp3`);
          resolve();
        })
    });
  }

  private getHighestAudioFormat(info: videoInfo): videoFormat {
    const formats: videoFormat[] = ytdl.filterFormats(info.formats, 'audio');

    return formats.sort((formatA: videoFormat, formatB: videoFormat) => {
      return formatB.audioBitrate - formatA.audioBitrate;
    })[0]; 
    /* sort DESC, get the highest audio bitrate available ⬆️  */
  }

  private extractAudio(data: IExtractAudioData): void {
    try {
      const { bitrate, inputName, outputName, codec } = data;
      if(codec == 'mp3') {
        exec(`ffmpeg -i ${inputName}.mp4 -vn -acodec ${codec} -ab ${bitrate}k -ar 44100 -ac 2 ${outputName}.mp3`)
          .on('exit', (stdout: string) => {
            unlink(inputName + '.mp4', () => {
              this._logger.verbose(`FFMPEG output: ${JSON.stringify(stdout)}`);
            });
          })
          .on('error', (err: ExecException, stderr: string) => {
            const error = err || stderr;
            if(error) {
              this._logger.log(error);
              throw error;
            }
          });
      } else {
        throw new HttpException(
          `Codec ${codec} is unsupported`,
          HttpStatus.NOT_IMPLEMENTED
        );
      }
    } catch(err) {
      throw err;
    }
  }
}
