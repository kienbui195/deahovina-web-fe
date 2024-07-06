export type TLang = 'vi-VN' | 'en' | 'ko-KR'

export interface IMedia {
  id: number;
  attributes: {
    name?: string;
    url: string;
    width?: number;
    height?: number;
  }
}

export interface IMultiLangContentValue {
  key: string;
  content: string;
}

export interface IMultiLangContentState {
  "vi-VN": IMultiLangContentValue[],
  en: IMultiLangContentValue[],
  "ko-KR": IMultiLangContentValue[]
}

export interface IGlobalData {
  top_banner: ITopBanner[]
}

export interface ITopBanner {
  id: number;
  link_on_click: string;
  url: string;
}

export interface IAboutInfo {
  id: number;
  content?: string;
  hero_title?: string;
  hero_images: {
    data?: IMedia[]
  }
}

export interface IBasicInfo {
  id: number;
  address?: string;
  fax?: string;
  tel?: string;
}

export interface IMainSpecialization {
  id: number;
  name: string;
  desc?: string;
}

export interface ICompanyInfo {
  id: number;
  attributes: {
    email?: string;
    main_specialization?: IMainSpecialization[];
    about_info?: IAboutInfo;
    basic_info?: IBasicInfo[]
  }
}