export interface IContent {
  name: string;
  translatedName: string;
  img: string;
  audio: string;
  orthography: string;
}

export interface ISavePreference {
  score: number;
  correctAnswer?: number;
  currentTime?: number;
}

export interface IAppendContentParam {
  category: string;
  path: string | null | undefined;
}
