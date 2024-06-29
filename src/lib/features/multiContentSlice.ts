import { TLang } from './../../dataTypes/index';

import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction } from "@reduxjs/toolkit";
import { getContentWithLang } from '../function';

export const multiLangContentSlice = createSlice({
  name: 'langContent',
  initialState: getContentWithLang('vi'),
  reducers: {
    chooseLang: (state, action: PayloadAction<TLang>) => {      
      return state = getContentWithLang(action.payload)
    },
  }
})

export const {chooseLang} = multiLangContentSlice.actions

export default multiLangContentSlice.reducer