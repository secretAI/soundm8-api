import { PitchKey } from "src/lib";

export interface ICreateOrderData {
  url: string;
  key?: PitchKey;
  bpm?: number;
  username: string;
}