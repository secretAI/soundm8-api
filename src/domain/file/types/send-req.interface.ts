export interface ISendApiRequestData {
  endPoint: string;
  videoUrl: string;
  api: SonicApiData;
}

type SonicApiFormatType = 'xml' | 'json' | 'jsonp' | 'xmlp';

export interface SonicApiData {
  format: SonicApiFormatType;
  blocking: boolean;
}
