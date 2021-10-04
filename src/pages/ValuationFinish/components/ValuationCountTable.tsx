import React, { useCallback, useMemo } from 'react'
import Table from '@material-ui/core/Table'
import { TableBody, Typography } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { useStyles } from './tableStyles'
import ValuationComparisonTables from './ValuationComparisonTables'

const ValuationCountTable = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    const valuationObjectsParameters = useAppSelector(
        (state) => state.valuation.valuationObjectsParameters
    )
    const valuationObjectsAreas = useAppSelector(
        (state) => state.valuation.valuationObjectsAreas
    )
    const valuationObjectsPrices = useAppSelector(
        (state) => state.valuation.valuationObjectsPrices
    )
    const valuationObjectParameters = useAppSelector(
        (state) => state.valuation.valuationObjectParameters
    )
    const valuationObject = useAppSelector(
        (state) => state.valuation.valuationObject
    )
    const valuationParametersStandardizedWeights = useAppSelector(
        (state) => state.valuation.valuationParametersStandardizedWeights
    )
    const valuationParametersObjects = useAppSelector(
        (state) => state.valuation.valuationParametersObjects
    )

    const createData = useCallback(
        (
            attribute: string,
            standardizedWeight: number,
            shareOfTheAmount: number,
            range: number,
            weightFactor: number,
            attributeValue: number
        ) => {
            return {
                attribute,
                standardizedWeight: standardizedWeight + ' %',
                shareOfTheAmount,
                range,
                weightFactor,
                attributeValue,
            }
        },
        []
    )

    const rowsHeader: string[] = useMemo(() => {
        const rowsHeader: string[] = []
        rowsHeader.push(t('attribute'))
        rowsHeader.push(t('standardized weight'))
        rowsHeader.push(t('share of the amount'))
        rowsHeader.push(t('range'))
        rowsHeader.push(t('weight factor'))
        rowsHeader.push(valuationObject)
        return rowsHeader
    }, [valuationObject, t])

    const differenceMinAndMaxUnitPrice = useMemo(() => {
        const unitPriceArray: number[] = valuationObjectsPrices.map(
            (price, index) => price / valuationObjectsAreas[index]
        )
        return Math.max(...unitPriceArray) - Math.min(...unitPriceArray)
    }, [valuationObjectsAreas, valuationObjectsPrices])

    const attributesRanges: number[] = useMemo(() => {
        const attributesRanges: number[] = []
        const combinedObjectsParameters = [
            ...valuationObjectsParameters,
            valuationObjectParameters,
        ]
        for (let i = 0; i < valuationParametersObjects.length; i++) {
            let minParam: number =
                combinedObjectsParameters[0][valuationParametersObjects[i]]
            let maxParam: number =
                combinedObjectsParameters[0][valuationParametersObjects[i]]
            combinedObjectsParameters.forEach((parameter) => {
                if (parameter[valuationParametersObjects[i]] < minParam)
                    minParam = parameter[valuationParametersObjects[i]]
                if (parameter[valuationParametersObjects[i]] > maxParam)
                    maxParam = parameter[valuationParametersObjects[i]]
            })
            attributesRanges.push(maxParam - minParam)
        }
        return attributesRanges
    }, [
        valuationObjectsParameters,
        valuationObjectParameters,
        valuationParametersObjects,
    ])

    const shares = useMemo(() => {
        const shares: number[] = []
        for (let i = 0; i < valuationParametersObjects.length; i++) {
            const share =
                (valuationParametersStandardizedWeights[i] *
                    differenceMinAndMaxUnitPrice) /
                100
            shares.push(share)
        }
        return shares
    }, [
        valuationParametersStandardizedWeights,
        differenceMinAndMaxUnitPrice,
        valuationParametersObjects,
    ])

    const shareFactors = useMemo(() => {
        const shareFactors: number[] = []
        for (let i = 0; i < valuationParametersObjects.length; i++) {
            const shareFactor = shares[i] / attributesRanges[i]
            shareFactors.push(shareFactor)
        }
        return shareFactors
    }, [attributesRanges, valuationParametersObjects, shares])

    const rows: { [key: string]: number | string }[] = useMemo(() => {
        const rows: { [key: string]: number | string }[] = []
        for (let i = 0; i < valuationParametersObjects.length; i++) {
            const row: { [key: string]: number | string } = createData(
                valuationParametersObjects[i],
                valuationParametersStandardizedWeights[i],
                Number.parseFloat(shares[i].toFixed(2)),
                attributesRanges[i],
                Number.parseFloat(shareFactors[i].toFixed(2)),
                Object.values(valuationObjectParameters)[i]
            )
            rows.push(row)
        }
        return rows
    }, [
        shares,
        shareFactors,
        attributesRanges,
        createData,
        valuationObjectParameters,
        valuationParametersStandardizedWeights,
        valuationParametersObjects,
    ])

    return (
        <>
            <Typography className={classes.header} variant="h2">
                {t('Valuation')}
            </Typography>
            <TableContainer
                component={Paper}
                elevation={0}
                className={classes.tableContainer}
            >
                <Table
                    className={classes.table}
                    aria-label="valuation count table"
                >
                    <TableHead>
                        <TableRow>
                            {rowsHeader.map((row, index) => (
                                <TableCell
                                    key={index}
                                    className={classes.tableHeadCell}
                                >
                                    {row}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                className={classes.tableBodyRow}
                            >
                                {Object.values(row).map((value, index) => (
                                    <TableCell
                                        key={index}
                                        className={classes.tableBodyCell}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        <TableRow className={classes.tableBodyRow}>
                            <TableCell
                                className={classes.tableBodyCell}
                                colSpan={2}
                            >
                                {t('Extreme Unit Prices difference') + ':'}
                            </TableCell>
                            <TableCell
                                className={classes.tableBodyCell}
                                colSpan={100}
                            >
                                {'Σ ' + differenceMinAndMaxUnitPrice.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <ValuationComparisonTables
                valuationObjectParameters={valuationObjectParameters}
                valuationObjectsParameters={valuationObjectsParameters}
                shareFactors={shareFactors}
                valuationObject={valuationObject}
                valuationParametersObjects={valuationParametersObjects}
                valuationObjectsPrices={valuationObjectsPrices}
            />
        </>
    )
}

export default ValuationCountTable
