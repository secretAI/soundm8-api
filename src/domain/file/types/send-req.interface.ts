export interface ISendApiRequestData {
  endPoint: string;
  api: SonicApiData;
}

export type SonicApiData = {
  apiKey: string;
  file: Buffer;
  format: string;
  blocking: boolean;
}
