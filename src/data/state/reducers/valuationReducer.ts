import { AnyAction } from 'redux'
import {
    FinishedSteps,
    ValuationObjectsCoordinates,
    Coordinates,
} from 'typings'

import { ValuationReducer } from './interfaces'
import * as types from '../constans'

const initialState = {
    finishedSteps: 0 as FinishedSteps,
    valuationObject: '',
    valuationParametersScale: [0, 5],
    valuationParametersObjects: [''],
    valuationObjects: [''],
    valuationObjectsCoordinates: [[null, null]] as ValuationObjectsCoordinates,
    valuationObjectCoordinates: [null, null] as Coordinates,
    valuationObjectsAreas: [0],
    valuationObjectArea: 0,
    valuationObjectsPrices: [0],
    valuationObjectPrice: 0,
    mapReference: null,
    activeObject: 0 as number,
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
        case types.SET_VALUATION_OBJECTS_COORDINATES:
            return { ...state, valuationObjectsCoordinates: action.payload }
        case types.SET_VALUATION_OBJECT_COORDINATES:
            return { ...state, valuationObjectCoordinates: action.payload }
        case types.SET_VALUATION_OBJECTS_PRICES:
            return { ...state, valuationObjectsPrices: action.payload }
        case types.SET_VALUATION_OBJECT_PRICE:
            return { ...state, valuationObjectPrice: action.payload }
        case types.SET_VALUATION_OBJECTS_AREAS:
            return { ...state, valuationObjectsAreas: action.payload }
        case types.SET_VALUATION_OBJECT_AREA:
            return { ...state, valuationObjectArea: action.payload }
        case types.SET_MAP_REFERENCE:
            return { ...state, mapReference: action.payload }
        case types.SET_ACTIVE_OBJECT:
            return { ...state, activeObject: action.payload }
        default:
            return state
    }
}

export default reducer
