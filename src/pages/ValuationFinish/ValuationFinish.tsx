import { Container } from '@material-ui/core'
import React from 'react'
import { Stepper } from 'components'
import { Steps } from 'typings'
import ValuationDetailsTable from './components'

///////////////////////////////////
import { FetchDataFromApiToState } from 'utils/functions/fetchDataFromAPIToState'
import {
    fetchValuationObjectFromAPI,
    fetchValuationObjectsFromAPI,
    fetchWorksFromAPI,
} from '../../data/fetch/valuationsFetch'
import {
    setFinishedSteps,
    setParametersObjects,
    setParametersScale,
    setValuationObject,
    setValuationObjectArea,
    setValuationObjectParameters,
    setValuationObjects,
    setValuationObjectsAreas,
    setValuationObjectsParameters,
    setValuationObjectsPrices,
} from '../../data/state/actions/valuationActions'
import { useAppDispatch } from '../../utils/hooks/useAppDispach'
import ValuationWeightsTables from './components/ValuationWeightsTables'
/////////////////////////////////////////////

const ValuationFinish = () => {
    ////////////////////////////////Funkcja  FetchDataFromApiToState dziaa
    const dispatch = useAppDispatch()
    const handleFetch = async () => {
        const { valuationObjectId, valuationObjectsId } =
            await fetchWorksFromAPI('1')
        const {
            name: valuationObject,
            objectParameters: valuationObjectParameters,
            area: valuationObjectArea,
        } = await fetchValuationObjectFromAPI(valuationObjectId)
        const {
            names: valuationObjects,
            areas: valuationObjectsAreas,
            prices: valuationObjectsPrices,
            objectsParameters: valuationObjectsParameters,
        } = await fetchValuationObjectsFromAPI(valuationObjectsId)

        const valuationObjectsParametersValues =
            await valuationObjectsParameters
                .map((obj: { [key: string]: number }) => {
                    return Object.values(obj)
                })
                .flat()
                .concat(Object.values(valuationObjectParameters))

        const valuationParametersObjects = Object.keys(
            valuationObjectParameters
        )

        await dispatch(setValuationObject(valuationObject))
        await dispatch(setValuationObjects(valuationObjects))
        await dispatch(setFinishedSteps(2))
        await dispatch(setParametersObjects(valuationParametersObjects))
        await dispatch(setValuationObjectParameters(valuationObjectParameters))
        await dispatch(
            setValuationObjectsParameters(valuationObjectsParameters)
        )
        await dispatch(setValuationObjectsAreas(valuationObjectsAreas))
        await dispatch(setValuationObjectsPrices(valuationObjectsPrices))
        await dispatch(setValuationObjectArea(valuationObjectArea))
        await dispatch(
            setParametersScale([
                Math.min(...valuationObjectsParametersValues),
                Math.max(...valuationObjectsParametersValues),
            ])
        )
    }
    //////////////////////////////////koniec kopii FetchDataFromApiToState
    return (
        <Container>
            <Stepper activeStepFromProps={2 as Steps} />
            <ValuationDetailsTable />
            <ValuationWeightsTables />
            <button onClick={handleFetch}>fetch</button>
        </Container>
    )
}

export default ValuationFinish
