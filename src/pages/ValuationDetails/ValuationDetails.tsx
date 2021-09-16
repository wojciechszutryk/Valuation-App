import { Container } from '@material-ui/core'
import React from 'react'
import { GoogleMaps, Stepper } from 'components'
import { Steps } from 'typings'
import GoogleMapsSearch from '../../components/MyGoogleMaps/GoogleMapsSearch'

const ValuationDetails: React.FC = () => {
    return (
        <Container>
            <Stepper activeStepFromProps={1 as Steps} />
            <GoogleMaps name={'some address'} />
            <GoogleMapsSearch />
        </Container>
    )
}

export default ValuationDetails
