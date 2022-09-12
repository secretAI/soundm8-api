import { Bitrate, Codec, Extension, PitchKey } from '../../../lib';

export interface ICreateOrderData {
  url: string;
  key?: PitchKey;
  bpm?: number;
  codec?: Codec;
  ext?: Extension;
  bitrate?: Bitrate;
  username: string;
}
