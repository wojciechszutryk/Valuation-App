import { Container } from '@material-ui/core'
import React from 'react'
import { Stepper } from 'components'
import { Steps } from 'typings'

const ValuationDetails: React.FC = () => {
    return (
        <Container>
            <Stepper activeStepFromProps={1 as Steps} />
        </Container>
    )
}

export default ValuationDetails
