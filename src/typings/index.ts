export type Theme = 'lightTheme' | 'darkTheme'
export type Language = 'en' | 'de' | 'pl'

export type Steps = 0 | 1 | 2

export type FinishedSteps = 0 | 1 | 2 | 3
export type ValuationObject = string
export type ValuationParametersScale = number[]
export type ValuationParametersObjects = string[]
export type ValuationObjects = string[]
export type ValuationObjectsCoordinates = Coordinates[]
export type ValuationObjectsProperties = ValuationObjectProperties[]

export type Coordinates = [number, number] | [null, null]
export type ValuationObjectProperties = { string: number }
