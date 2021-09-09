import { AnyAction } from 'redux'

import * as types from '../constans'
import { LANGUAGE, THEME } from 'typings'

export const setTheme = (theme: THEME): AnyAction => ({
    type: types.SET_THEME,
    payload: theme,
})

export const setLanguage = (language: LANGUAGE): AnyAction => ({
    type: types.SET_LANGUAGE,
    payload: language,
})
