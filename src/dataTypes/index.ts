export type TLang = 'vi' | 'en' | 'kr'

export interface IMultiLangContentValue {
  key: string;
  content: string;
}

export interface IMultiLangContentState {
  vi: IMultiLangContentValue[],
  en: IMultiLangContentValue[],
  kr: IMultiLangContentValue[]
}