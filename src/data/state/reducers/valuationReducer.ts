import { AnyAction } from 'redux'
import { FinishedSteps } from 'typings'

import { ValuationReducer } from './interfaces'
import * as types from '../constans'

const initialState = {
    finishedSteps: 0 as FinishedSteps,
    valuationObject: '',
    valuationParametersScale: [0, 5],
    valuationParametersObjects: [''],
    valuationObjects: [''],
    mapReference: null,
}

const reducer = (
    state: ValuationReducer = initialState,
    action: AnyAction
): ValuationReducer => {
    switch (action.type) {
        case types.SET_FINISHED_STEPS:
            return { ...state, finishedSteps: action.payload }
        case types.SET_VALUATION_OBJECT:
            return { ...state, valuationObject: action.payload }
        case types.SET_VALUATION_PARAMETERS_SCALE:
            return { ...state, valuationParametersScale: action.payload }
        case types.SET_VALUATION_PARAMETERS_OBJECTS:
            return { ...state, valuationParametersObjects: action.payload }
        case types.SET_VALUATION_OBJECTS:
            return { ...state, valuationObjects: action.payload }
        case types.SET_MAP_REFERENCE:
            return { ...state, mapReference: action.payload }
        default:
            return state
    }
}

export default reducer
