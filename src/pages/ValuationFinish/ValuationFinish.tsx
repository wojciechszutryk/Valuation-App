import { Container } from '@material-ui/core'
import React from 'react'
import { Stepper } from '../../components'
import { Steps } from '../../typings'

const ValuationFinish: React.FC = () => {
    return (
        <Container>
            <Stepper activeStepFromProps={2 as Steps} />
        </Container>
    )
}

export default ValuationFinish
