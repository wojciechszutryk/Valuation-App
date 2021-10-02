import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useStyles } from './tableStyles'

interface Props {
    valuationObjectParameters: { [key: string]: number }
    valuationObjectsParameters: { [key: string]: number }[]
    shareFactors: number[]
}

const ValuationComparisonTables = ({
    valuationObjectParameters,
    valuationObjectsParameters,
    shareFactors,
}: Props) => {
    console.log(
        valuationObjectParameters,
        valuationObjectsParameters,
        shareFactors
    )
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const valuationObjectsForValidation = useAppSelector(
        (state) => state.valuation.valuationObjectsForValidation
    )

    const createData = useCallback(
        (
            index: number,
            name: string,
            area: number,
            properties: { [key: string]: number },
            price: number | null = null,
            unitPrice: number | null = null
        ) => {
            return Object.assign(
                {},
                { index, name, area, price, unitPrice },
                properties
            )
        },
        []
    )

    // const rowsHeader: string[] = useMemo(() => {
    //     const rowsHeader: string[] = []
    //     rowsHeader.push(t('index'))
    //     rowsHeader.push(t('name'))
    //     rowsHeader.push(t('area'))
    //     rowsHeader.push(t('price'))
    //     rowsHeader.push(t('unit price'))
    //     rowsHeader.push.apply(rowsHeader, valuationParametersObjects)
    //     rowsHeader.push(t('for valuation'))
    //     return rowsHeader
    // }, [valuationParametersObjects, t])

    // const rows: { [key: string]: number | string }[] = useMemo(() => {
    //     const rows: { [key: string]: number | string }[] = []
    //
    //     for (let i = 0; i < valuationObjects.length; i++) {
    //         const row: { [key: string]: number | string } = createData(
    //             i + 1,
    //             valuationObjects[i],
    //             valuationObjectsAreas[i],
    //             valuationObjectsParameters[i],
    //             valuationObjectsPrices[i],
    //             parseInt(
    //                 (
    //                     valuationObjectsPrices[i] / valuationObjectsAreas[i]
    //                 ).toFixed(2)
    //             )
    //         )
    //         rows.push(row)
    //     }
    //     return rows
    // }, [
    //     createData,
    //     valuationObjects,
    //     valuationObjectsAreas,
    //     valuationObjectsPrices,
    //     valuationObjectsParameters,
    // ])

    return <></>
}

export default ValuationComparisonTables
