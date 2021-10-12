import { Container } from '@material-ui/core'
import React, { useMemo, useEffect } from 'react'
import { Stepper } from 'components'
import { Steps } from 'typings'
import { ValuationCountTable, ValuationDetailsTable, ErrorInValuationMessage } from './components'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { showToast } from 'utils'
import { useTranslation } from 'react-i18next'

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
import ExportResults from './components/ExportResults'
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
    let history = useHistory();
    const { t } = useTranslation()
    const valuationParametersStandardizedWeights = useAppSelector(
        (state) => state.valuation.valuationParametersStandardizedWeights
    )
    const finishedSteps = useAppSelector(
        (state) => state.valuation.finishedSteps
    )
    // useEffect(() => {
    //     toast.dismiss()
    //     if (finishedSteps < 2) {
    //         history.goBack()
    //         showToast(
    //             t(
    //                 'You cant access that page before completing previous valuation steps'
    //             )
    //         )
    //     }
    // }, [finishedSteps, history, t])


    const weightsErrorsIndexes: number[] = useMemo(() => {
        const weightsErrorsIndexes: number[] = []
        valuationParametersStandardizedWeights.forEach((weight, index) => {
            if (!weight) {
                weightsErrorsIndexes.push(index)
            }
        })
        return weightsErrorsIndexes;
    }, [valuationParametersStandardizedWeights])

    return (
        <Container>
            <Stepper activeStepFromProps={2 as Steps} />
            <ValuationDetailsTable />
            <button onClick={handleFetch}>fetch</button>
            <ValuationWeightsTables />
            {weightsErrorsIndexes.length === 0 ?
                <>
                    <ValuationCountTable />
                    <ExportResults /></>
                : <ErrorInValuationMessage valuationErrorInWeights={weightsErrorsIndexes} />}

        </Container>
    )
}

export default ValuationFinish
