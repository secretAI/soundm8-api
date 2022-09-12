import { 
  HttpException, 
  HttpStatus, 
  Inject, 
  Injectable, 
  Logger,
  forwardRef, 
} from "@nestjs/common";
import ytdl, { videoFormat, videoInfo } from 'ytdl-core';
import { createWriteStream, unlink } from "fs";
import { ConfigService } from "src/modules/config";
import { IExtractAudioData } from "./types";
import { OrderService } from "../orders";
import { YIN } from 'pitchfinder';
import { ChildProcess, exec, ExecException } from 'child_process';
import { Codec } from "src/lib";

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
  ) {}

  public async processUrl(url: string): Promise<void> {
    if(!ytdl.validateURL(url)) {
      throw new HttpException(
        'Invalid Youtube Video URL',
        HttpStatus.BAD_REQUEST
      );
    }

    return new Promise(async (resolve, reject) => {
      const filename = Date.now().toString();
      const info: videoInfo = await ytdl.getInfo(url);
      const format: videoFormat = this.getAppropriateFormat(info);

      return ytdl(url, { format })
        .pipe(createWriteStream(filename + '.mp4'))
        .on('error', (err) => reject(err))
        .on('finish', async () => {
          this.extractAudio({
            filename,
            bitrate: 320,
            ext: 'wav'
          });
          /* ToDo: switch mp3 to ${ext} ⬇️ */
          this._logger.log(`Audio available at: ${filename}.mp3`);
          resolve();
        })
    });
  }

  private getAppropriateFormat(info: videoInfo): videoFormat {
    const formats: videoFormat[] = ytdl.filterFormats(info.formats, 'audioonly');

    return formats.sort((format: videoFormat, _format: videoFormat) => {
      return _format.audioBitrate - format.audioBitrate;
    })[0]; 
    /* sort DESC, get the highest audio bitrate available ⬆️  */
  }

  private extractAudio(data: IExtractAudioData): void {
    const { bitrate, filename, ext } = data;
    let codec: Codec;
    const callback = (err: ExecException, stdout: string) => {
      if(err) {
        this._logger.error(err);
        throw new HttpException(
          err,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      if(stdout) {
        this._logger.verbose(`FFMPEG output: ${stdout}`);
      }
    };
    /* -ab strange behavior ⬇️ fixed 😇 */
    if(ext == 'mp3') {
      codec = 'mp3';
      const process: ChildProcess = exec(`ffmpeg -i ${filename}.mp4 -acodec ${codec} -vn -ab ${bitrate}k -ar 44100 -ac 2 ${filename}.${ext}`, callback);
      process.on('exit', (exitCode: number) => {
        unlink(filename + '.mp4', () => {
          this._logger.verbose(`FFMPEG exit code: ${exitCode}`);
        });
      });
      process.on('error', (err: Error) => {
        unlink(filename + '.mp4', () => { throw err });
      });

      return;
    }
    if(ext == 'wav') {
      codec = 'pcm_s16le';
      const process: ChildProcess = exec(`ffmpeg -i ${filename}.mp4 -acodec ${codec} -vn -ar 44100 -ac 2 ${filename}.${ext}`, callback)
      process.on('exit', (exitCode: number) => {
        unlink(filename + '.mp4', () => {
          this._logger.verbose(`FFMPEG exit code: ${exitCode}`);
        });
      });
      process.on('error', (err: Error) => {
        unlink(filename + '.mp4', () => { throw err });
      });

      return;
    }

    throw new HttpException(
      'Error during audio extraction', 
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  public async getPitchKey() {}
}
