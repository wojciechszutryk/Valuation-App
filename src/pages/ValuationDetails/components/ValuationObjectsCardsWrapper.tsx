import React from 'react'
import { ValuationObjects, ValuationParametersObjects } from 'typings'
import ValuationObjectCard from './ValuationObjectCard'

interface Props {
    valuationObjects: ValuationObjects
    valuationObject: string
    valuationCriteria: ValuationParametersObjects
}
const ValuationObjectsCardsWrapper = ({
    valuationObjects,
    valuationObject,
    valuationCriteria
}: Props) => {
    return (
        <div>
            {valuationObjects.map(obj => (
                <ValuationObjectCard title={obj} valuationCriteria={valuationCriteria}/>
            ))}
        </div>
    )
}

export default ValuationObjectsCardsWrapper;