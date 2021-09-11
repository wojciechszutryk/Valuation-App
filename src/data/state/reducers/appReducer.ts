import { AnyAction } from 'redux'
import { Language, Theme } from 'typings'
import { AppReducer } from './interfaces'
import * as types from '../constans'

const initialState = {
    theme: 'lightTheme' as Theme,
    language: 'en' as Language,
}

const reducer = (
    state: AppReducer = initialState,
    action: AnyAction
): AppReducer => {
    switch (action.type) {
        case types.SET_THEME:
            return { ...state, theme: action.payload }
        case types.SET_LANGUAGE:
            return { ...state, language: action.payload }
        default:
            return state
    }
}

export default reducer
