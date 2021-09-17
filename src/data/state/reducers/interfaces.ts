import {
    FinishedSteps,
    Language,
    Theme,
    ValuationObject,
    ValuationObjects,
    ValuationObjectsCoordinates,
    ValuationParametersObjects,
    ValuationParametersScale,
} from 'typings'

export interface AppReducer {
    theme: Theme
    language: Language
}

export interface ValuationReducer {
    finishedSteps: FinishedSteps
    valuationObject: ValuationObject
    valuationParametersScale: ValuationParametersScale
    valuationParametersObjects: ValuationParametersObjects
    valuationObjects: ValuationObjects
    valuationObjectsCoordinates: ValuationObjectsCoordinates
    mapReference: any
    activeObject: number
}
