import { Container } from '@material-ui/core'
import React from 'react'
import { Stepper } from '../../components'
import { Steps } from '../../typings'
import ValuationObjectsForm from './components'

const ValuationNew: React.FC = () => {
    return (
        <Container>
            <Stepper activeStepFromProps={0 as Steps}>
                <ValuationObjectsForm />
            </Stepper>
        </Container>
    )
}

export default ValuationNew
