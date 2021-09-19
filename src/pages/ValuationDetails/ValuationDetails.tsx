import { Container } from '@material-ui/core'
import React, { useEffect } from 'react'
import { GoogleMaps, Stepper } from 'components'
import { Steps, ValuationObjectsCoordinates } from 'typings'
import { addressToCoordinates } from 'utils/functions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import {
    setValuationObjectsCoordinates,
    setValuationObjectCoordinates,
} from '../../data/state/actions/valuationActions'
import { ValuationObjectsCardsWrapper } from './components'

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
    const storeObjectCoordinates = useAppSelector(
        (state) => state.valuation.valuationObjectCoordinates
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
            const coord = await addressToCoordinates(obj)
            await coords.push(coord)
        }
        const coord = await addressToCoordinates(storeValuationObject)
        dispatch(setValuationObjectsCoordinates(coords))
        dispatch(setValuationObjectCoordinates(coord))
    }

    useEffect(() => {
        objectsToCoords()
    }, [])

    return (
        <Container>
            <Stepper activeStepFromProps={1 as Steps} />
            <GoogleMaps
                valuationObjectsCoordinates={storeObjectsCoordinates}
                valuationObjectCoordinates={storeObjectCoordinates}
                valuationObjects={storeValuationObjects}
                valuationObject={storeValuationObject}
            />
            <ValuationObjectsCardsWrapper
                valuationObjects={storeValuationObjects}
                valuationObject={storeValuationObject}
                valuationCriteria={storeValuationCriteria}
                valuationObjectsCoordinates={storeObjectsCoordinates}
                valuationObjectCoordinates={storeObjectCoordinates}
            />
        </Container>
    )
}

export default ValuationDetails
