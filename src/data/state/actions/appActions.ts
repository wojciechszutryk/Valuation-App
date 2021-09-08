import { AnyAction } from 'redux'

import * as types from '../constans'
import { THEME } from 'typings'

export const setTheme = (theme: THEME): AnyAction => ({
    type: types.SET_THEME,
    payload: theme,
})
