import { Container } from '@material-ui/core'
import React from 'react'
import { Stepper } from 'components'
import { Steps } from 'typings'
import { FetchDataFromApiToState } from 'utils/functions/fetchDataFromAPIToState'

const ValuationFinish = () => {
    FetchDataFromApiToState('1')
    return (
        <Container>
            <Stepper activeStepFromProps={2 as Steps} />
        </Container>
    )
}

export default ValuationFinish
