import { AnyAction } from 'redux'
import { FinishedSteps } from 'typings'

import { ValuationReducer } from './interfaces'
import * as types from '../constans'

const initialState = {
    finishedSteps: 0 as FinishedSteps,
}

const reducer = (
    state: ValuationReducer = initialState,
    action: AnyAction
): ValuationReducer => {
    switch (action.type) {
        case types.SET_FINISHED_STEPS:
            return { ...state, finishedSteps: action.payload }
        default:
            return state
    }
}

export default reducer
