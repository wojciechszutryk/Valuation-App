import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import { Stepper } from '../../components'
import { Steps } from '../../typings'
import {
    ValuationObjectInput,
    ValuationObjectsForm,
    ValuationPropertiesForm,
} from './components'

const ValuationNew: React.FC = () => {
    const [valuationObjects, setValidationObjects] = useState<string[]>([''])
    const [valuationCriteria, setValuationCriteria] = useState<string[]>([''])
    const [valuationObject, setValuationObject] = useState('')
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
            />
        </Container>
    )
}

export default ValuationNew
