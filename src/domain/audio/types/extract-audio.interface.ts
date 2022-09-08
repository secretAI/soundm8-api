export interface IExtractAudioData {
  bitrate: number;
  inputName: string;
  outputName: string;
  codec?: AudioCodec;
};


export type AudioCodec = 'mp3'|'opus';