import { Container } from '@material-ui/core'
import React, { useMemo, useEffect } from 'react'
import { Stepper } from 'components'
import { Steps } from 'typings'
import {
    ValuationCountTable,
    ValuationDetailsTable,
    ErrorInValuationMessage,
} from './components'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { showToast } from 'utils'
import { useTranslation } from 'react-i18next'
import ExportResults from './components/ExportResults'
import ValuationWeightsTables from './components/ValuationWeightsTables'

const ValuationFinish = () => {
    let history = useHistory()
    const { t } = useTranslation()
    const valuationParametersStandardizedWeights = useAppSelector(
        (state) => state.valuation.valuationParametersStandardizedWeights
    )
    const finishedSteps = useAppSelector(
        (state) => state.valuation.finishedSteps
    )
    useEffect(() => {
        toast.dismiss()
        if (finishedSteps < 2) {
            history.goBack()
            showToast(
                t(
                    'You cant access that page before completing previous valuation steps'
                )
            )
        }
    }, [finishedSteps, history, t])

    const weightsErrorsIndexes: number[] = useMemo(() => {
        const weightsErrorsIndexes: number[] = []
        valuationParametersStandardizedWeights.forEach((weight, index) => {
            if (!weight) {
                weightsErrorsIndexes.push(index)
            }
        })
        return weightsErrorsIndexes
    }, [valuationParametersStandardizedWeights])

    return (
        <Container>
            <Stepper activeStepFromProps={2 as Steps} />
            <ValuationDetailsTable />
            <ValuationWeightsTables />
            {weightsErrorsIndexes.length === 0 ? (
                <>
                    <ValuationCountTable />
                    <ExportResults />
                </>
            ) : (
                <ErrorInValuationMessage
                    valuationErrorInWeights={weightsErrorsIndexes}
                />
            )}
        </Container>
    )
}

export default ValuationFinish
