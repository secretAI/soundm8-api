import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ytdl from 'ytdl-core';
import { createWriteStream, read, unlink } from "fs";
import { ConfigService } from "src/modules/config";
import { ISendApiRequestData, SonicApiData } from "./types";
import { OrderService } from "../orders";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { AxiosResponse } from "axios";
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
        _buffer.push(data)
      })
      .pipe(createWriteStream('stream'))
      .on('finish', () => {
        console.log(`Temporary Write Stream created at ${__dirname}`);
        resolve(Buffer.concat(_buffer));
        unlink('stream', () => console.log('Write Stream removed'));
      })
      .on('error', (err) => {
        reject(err);
      })
    });
  }

  public async sendApiRequest(data: ISendApiRequestData): Promise<any> {
    const url = encodeURI(this.apiUrl + data.endPoint);
    const audioBuffer: Buffer = await this.extractAudioBufferByUrl(data.videoUrl);
    // const request = await lastValueFrom(this._httpService.post<SonicApiData>(url + '/tempo', {
    //   access_id: this.apiKey,
    //   input_file: audioBuffer,
    //   format: data.api.format || 'json',
    //   blocking: data.api.blocking
    // }, {
    //   headers: {
    //     'Content-Type': 'audio/mpeg'
    //   }
    // }));
    // const stream = got.stream(url, {
    //   body: audioBuffer,
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });

    return;
  }
}
