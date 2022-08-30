import { forwardRef, Inject, Injectable } from "@nestjs/common";
import ytdl from 'ytdl-core';
import { createWriteStream, read, unlink } from "fs";
import { ConfigService } from "src/modules/config";
import { ISendApiRequestData } from "./types";
import { OrderService } from "../orders";

@Injectable()
export class FileService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  
  constructor(
    private readonly _config: ConfigService,
    @Inject(forwardRef(() => OrderService))
      private readonly _orderService: OrderService
  ) {
    this.apiUrl = this._config.config.sonicApi.url;
    this.apiKey = this._config.config.sonicApi.apiKey;
  }

  public async getAudioTrackBuffer(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const _buffer = [];
      return ytdl(url)
      .on('data', (data) => {
        _buffer.push(data)
      })
      .pipe(createWriteStream('stream'))
      .on('finish', () => {
        console.log(`Write Stream created at ${__dirname}`);
        resolve(Buffer.concat(_buffer));
        unlink('stream', () => console.log('Stream removed'));
      })
      .on('error', (err) => {
        reject(err);
      });
    });
  }

  public async sendApiRequest(data: ISendApiRequestData) {
    const url = encodeURI(this.apiUrl + data.endPoint);
    const audioBuffer = this.getAudioTrackBuffer(url);
  }
}
