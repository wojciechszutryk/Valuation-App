import { Container, createStyles, makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { GoogleMaps, Stepper } from 'components'
import { Steps, ValuationObjectsCoordinates } from 'typings'
import { addressToCoordinates } from 'utils/functions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { showToast } from 'utils'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import {
    setValuationObjectsCoordinates,
    setValuationObjectCoordinates,
} from 'data/state/actions/valuationActions'
import { StickyContainer, Sticky } from 'react-sticky'
import { ValuationObjectsCardsWrapper, ValuationNavigation } from './components'
import { useHistory } from 'react-router-dom'

// const useStyles = makeStyles((theme) => {
//     let history = useHistory()
//     const { t } = useTranslation()
//     const finishedSteps = useAppSelector(
//         (state) => state.valuation.finishedSteps
//     )
//     useEffect(() => {
//         toast.dismiss()
//         if (finishedSteps < 1) {
//             history.goBack()
//             showToast(
//                 t(
//                     'You cant access that page before completing previous valuation steps'
//                 )
//             )
//         }
//     }, [finishedSteps, history, t])
//     return createStyles({
//         sticky: {
//             '& > div:nth-child(2)': {
//                 zIndex: 1000,
//                 position: 'relative',
//             },
//         },
//     })
// })

const ValuationDetails: React.FC = () => {
    // const classes = useStyles()
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

    const objectsToCoords = useCallback(async () => {
        const coords: ValuationObjectsCoordinates = []
        for (const obj of storeValuationObjects) {
            const coord = await addressToCoordinates(obj)
            await coords.push(coord)
        }
        const coord = await addressToCoordinates(storeValuationObject)
        dispatch(setValuationObjectsCoordinates(coords))
        dispatch(setValuationObjectCoordinates(coord))
    }, [dispatch, storeValuationObject, storeValuationObjects])

    useEffect(() => {
        objectsToCoords()
    }, [objectsToCoords])

    return (
        <Container>
            {/*<StickyContainer className={classes.sticky}>*/}
            <Stepper activeStepFromProps={1 as Steps} />
            {/*<Sticky topOffset={140}>*/}
            {/*{({ style }) => (*/}
            {/*    <div style={style}>*/}
            <GoogleMaps
                valuationObjectsCoordinates={storeObjectsCoordinates}
                valuationObjectCoordinates={storeObjectCoordinates}
                valuationObjects={storeValuationObjects}
                valuationObject={storeValuationObject}
            />
            {/*</div>*/}
            {/*)}*/}
            {/*</Sticky>*/}
            <ValuationObjectsCardsWrapper
                valuationObjects={storeValuationObjects}
                valuationObject={storeValuationObject}
                valuationCriteria={storeValuationCriteria}
                valuationObjectsCoordinates={storeObjectsCoordinates}
                valuationObjectCoordinates={storeObjectCoordinates}
            />
            <ValuationNavigation />
            {/*</StickyContainer>*/}
        </Container>
    )
}

export default ValuationDetails
