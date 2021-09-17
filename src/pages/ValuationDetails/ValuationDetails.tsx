import { Container } from '@material-ui/core'
import React, { useEffect } from 'react'
import { GoogleMaps, Stepper } from 'components'
import { Steps, ValuationObjectsCoordinates } from 'typings'
import GoogleMapsSearch from 'components/MyGoogleMaps/GoogleMapsSearch'
import { addressToCoordinates } from 'utils/functions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { setValuationObjectsCoordinates } from '../../data/state/actions/valuationActions'

const ValuationDetails: React.FC = () => {
    const dispatch = useAppDispatch()
    const storeValuationObjects = useAppSelector(
        (state) => state.valuation.valuationObjects
    )
    const storeValuationCriteria = useAppSelector(
        (state) => state.valuation.valuationParametersObjects
    )
    const storeValuationObject = useAppSelector(
        (state) => state.valuation.valuationObject
    )
    const storeObjectsCoordinates = useAppSelector(
        (state) => state.valuation.valuationObjectsCoordinates
    )
    const storeValueCriteriaScale = useAppSelector(
        (state) => state.valuation.valuationParametersScale
    )

    const exampleObjects = [
        'dębica, gawrysia 19',
        'kraków, świętokrzystak 12',
        'kraków, karmelicka 17',
        'dadsadsdsa',
    ]

    const objectsToCoords = async () => {
        const coords: ValuationObjectsCoordinates = []
        for (const obj of storeValuationObjects) {
            // for (const obj of exampleObjects) {
            const coord = await addressToCoordinates(obj)
            await coords.push(coord)
        }
        dispatch(setValuationObjectsCoordinates(coords))
    }

    useEffect(() => {
        objectsToCoords()
    }, [])

    return (
        <Container>
            <Stepper activeStepFromProps={1 as Steps} />
            <GoogleMaps
                valuationObjectsCoordinates={storeObjectsCoordinates}
                valuationObjects={storeValuationObjects}
            />
            <GoogleMapsSearch />
        </Container>
    )
}

export default ValuationDetails
