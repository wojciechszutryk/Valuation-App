import { AnyAction } from 'redux'
import {
    FinishedSteps,
    ValuationObject,
    ValuationObjects,
    ValuationObjectsCoordinates,
    Coordinates,
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

export const setValuationObjectsCoordinates = (
    coordinates: ValuationObjectsCoordinates
): AnyAction => ({
    type: types.SET_VALUATION_OBJECTS_COORDINATES,
    payload: coordinates,
})

export const setValuationObjectCoordinates = (
    coordinates: Coordinates
): AnyAction => ({
    type: types.SET_VALUATION_OBJECT_COORDINATES,
    payload: coordinates,
})

export const setMapReference = (map: any): AnyAction => ({
    type: types.SET_MAP_REFERENCE,
    payload: map,
})

export const setValuationObjectsPrices = (prices: number[]): AnyAction => ({
    type: types.SET_VALUATION_OBJECTS_PRICES,
    payload: prices,
})

export const setValuationObjectArea = (area: number): AnyAction => ({
    type: types.SET_VALUATION_OBJECT_AREA,
    payload: area,
})

export const setValuationObjectsAreas = (areas: number[]): AnyAction => ({
    type: types.SET_VALUATION_OBJECTS_AREAS,
    payload: areas,
})

export const setActiveObject = (object: number | null): AnyAction => ({
    type: types.SET_ACTIVE_OBJECT,
    payload: object,
})

export const setValuationObjectParameters = (object: {
    [key: string]: number
}): AnyAction => ({
    type: types.SET_VALUATION_OBJECT_PARAMETERS,
    payload: object,
})

export const setValuationObjectsForValuation = (
    objects: number[]
): AnyAction => ({
    type: types.SET_VALUATION_OBJECTS_FOR_VALUATION,
    payload: objects,
})

export const setValuationObjectsParameters = (
    objects: { [key: string]: number }[]
): AnyAction => ({
    type: types.SET_VALUATION_OBJECTS_PARAMETERS,
    payload: objects,
})

export const setValuationParametersStandardizedWeights = (
    standardizedParameters: number[]
): AnyAction => ({
    type: types.SET_VALUATION_PARAMETERS_STANDARDIZED_WEIGHTS,
    payload: standardizedParameters,
})

export const setValuationErrorInWeights = (
    ErrorsIndexes: number[]
): AnyAction => ({
    type: types.SET_VALUATION_ERROR_IN_WEIGHTS,
    payload: ErrorsIndexes,
})
