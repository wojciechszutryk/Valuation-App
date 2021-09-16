import {
    FinishedSteps,
    Language,
    Theme,
    ValuationObject,
    ValuationObjects,
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
    mapReference: any
}
