import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ytdl from 'ytdl-core';
import { createWriteStream, read, unlink, unlinkSync } from "fs";
import { ConfigService } from "src/modules/config";
import { IGetPitchKeyData, ISendApiRequestData, SonicApiData } from "./types";
import { OrderService } from "../orders";
import { HttpService } from "@nestjs/axios";
import { Macleod } from 'pitchfinder';
import WavDecoder from 'wav-decoder';
// import { lastValueFrom } from "rxjs";
// import { AxiosResponse } from "axios";
// import { got } from 'got';

@Injectable()
export class FileService {
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

  private async extractAudioBufferByUrl(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const _buffer = [];
      return ytdl(url)
      .on('data', (data) => {
        _buffer.push(data);
      })
      .pipe(createWriteStream('audio'), { end: true })
      .on('finish', () => {
        resolve(Buffer.concat(_buffer));
        unlinkSync('audio');
      })
      .on('error', (err) => {
        reject(err);
      })
    });
  }

  public async getAudioPitchKey(data: IGetPitchKeyData): Promise<any> {
    try {
      const buffer = await this.extractAudioBufferByUrl(data.url);    
      const audioData = new Float32Array(buffer);
      const getPitchKey = Macleod({
        bufferSize: buffer.length
      });
      const frequency = getPitchKey(audioData); 
      console.log(frequency);
  
      return frequency;
    } catch(err) {
      throw err;
    }
  }
}
