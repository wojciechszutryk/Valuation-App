import { AnyAction } from 'redux'
import {
    FinishedSteps,
    ValuationObject,
    ValuationObjects,
    ValuationParametersObjects,
    ValuationParametersScale,
} from 'typings'

import * as types from '../constans'

// information how many form fields were correctly fulfilled - 0-none, 3-all
export const setFinishedSteps = (finishNumber: FinishedSteps): AnyAction => ({
    type: types.SET_FINISHED_STEPS,
    payload: finishNumber,
})

export const setValuationObject = (name: ValuationObject): AnyAction => ({
    type: types.SET_VALUATION_OBJECT,
    payload: name,
})

export const setParametersScale = (
    scale: ValuationParametersScale
): AnyAction => ({
    type: types.SET_VALUATION_PARAMETERS_SCALE,
    payload: scale,
})

export const setParametersObjects = (
    scale: ValuationParametersObjects
): AnyAction => ({
    type: types.SET_VALUATION_PARAMETERS_OBJECTS,
    payload: scale,
})

export const setValuationObjects = (names: ValuationObjects): AnyAction => ({
    type: types.SET_VALUATION_OBJECTS,
    payload: names,
})
