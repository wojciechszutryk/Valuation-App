import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import { Stepper, ValuationNavigation } from 'components'
import { Steps } from 'typings'
import {
    ValuationObjectInput,
    ValuationObjectsForm,
    ValuationPropertiesForm,
} from './components'

const initialState = {
    valuationObjects: [''],
    valuationCriteria: [''],
    valuationObject: '',
    valueCriteriaScale: [0, 5],
}

const ValuationNew: React.FC = () => {
    const [valuationObjects, setValidationObjects] = useState<string[]>(
        initialState.valuationObjects
    )
    const [valuationCriteria, setValuationCriteria] = useState<string[]>(
        initialState.valuationCriteria
    )
    const [valuationObject, setValuationObject] = useState(
        initialState.valuationObject
    )
    const [valueCriteriaScale, setValueCriteriaScale] = useState<number[]>(
        initialState.valueCriteriaScale
    )
    return (
        <Container>
            <Stepper activeStepFromProps={0 as Steps} />
            <ValuationObjectInput
                valuationObject={valuationObject}
                setValuationObject={setValuationObject}
            />
            <ValuationObjectsForm
                valuationObjects={valuationObjects}
                setValidationObjects={setValidationObjects}
            />
            <ValuationPropertiesForm
                valuationCriteria={valuationCriteria}
                setValuationCriteria={setValuationCriteria}
                valueCriteriaScale={valueCriteriaScale}
                setValueCriteriaScale={setValueCriteriaScale}
            />
            <ValuationNavigation
                allowNext={
                    valuationObjects !== initialState.valuationObjects &&
                    valuationCriteria !== initialState.valuationCriteria &&
                    valuationObject !== initialState.valuationObject
                }
            />
        </Container>
    )
}

export default ValuationNew
