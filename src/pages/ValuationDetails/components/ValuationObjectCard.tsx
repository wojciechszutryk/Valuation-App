import React from 'react'
import { ValuationObjects, ValuationParametersObjects } from 'typings'

interface Props {
    valuationCriteria: ValuationParametersObjects
    title: string
}
const ValuationObjectCard = ({ valuationCriteria, title }: Props) => {
    return (
        <div>
            {valuationCriteria}
            {title}
        </div>
    )
}

export default ValuationObjectCard;