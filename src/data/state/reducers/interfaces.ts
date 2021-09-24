import {
    FinishedSteps,
    Language,
    Theme,
    ValuationObject,
    ValuationObjects,
    ValuationObjectsCoordinates,
    Coordinates,
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
    valuationObjectsAreas: number[]
    valuationObjectArea: number
    valuationObjectsPrices: number[]
    valuationObjectCoordinates: Coordinates
    mapReference: any
    activeObject: number | null
    valuationObjectParameters: { [key: string]: number }
    valuationObjectsParameters: { [key: string]: number }[]
}
