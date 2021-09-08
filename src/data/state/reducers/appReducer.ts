import { AnyAction } from 'redux'
import { THEME } from 'typings'
import { AppReducer } from './interfaces'
import * as types from '../constans'

const initialState = {
    theme: 'lightTheme' as THEME,
}

const reducer = (
    state: AppReducer = initialState,
    action: AnyAction
): AppReducer => {
    switch (action.type) {
        case types.SET_THEME:
            return { ...state, theme: action.payload }
        default:
            return state
    }
}

export default reducer
