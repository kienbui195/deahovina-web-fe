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

export interface IGlobalData {
  top_banner: ITopBanner[]
}

export interface ITopBanner {
  id: number;
  link_on_click: string;
  url: string;
}