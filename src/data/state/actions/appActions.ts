import { AnyAction } from 'redux'

import * as types from '../constans'
import { Language, Theme } from 'typings'

export const setTheme = (theme: Theme): AnyAction => ({
    type: types.SET_THEME,
    payload: theme,
})

export const setLanguage = (language: Language): AnyAction => ({
    type: types.SET_LANGUAGE,
    payload: language,
})
