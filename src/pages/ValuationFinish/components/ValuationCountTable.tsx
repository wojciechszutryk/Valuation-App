import React, { useCallback, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import { Checkbox, TableBody, Typography } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import {
    setValuationObjectsForValuation,
    setValuationParametersStandardizedWeights,
} from 'data/state/actions/valuationActions'
import { listMostSimilarObjects } from 'utils/functions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useStyles } from './tableStyles'

const ValuationCountTable = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const valuationObjectsParameters = useAppSelector(
        (state) => state.valuation.valuationObjectsParameters
    )
    const valuationObjectsAreas = useAppSelector(
        (state) => state.valuation.valuationObjectsAreas
    )
    const valuationObjectArea = useAppSelector(
        (state) => state.valuation.valuationObjectArea
    )
    const valuationObjectsPrices = useAppSelector(
        (state) => state.valuation.valuationObjectsPrices
    )
    const valuationObjectParameters = useAppSelector(
        (state) => state.valuation.valuationObjectParameters
    )
    const valuationObjects = useAppSelector(
        (state) => state.valuation.valuationObjects
    )
    const valuationObject = useAppSelector(
        (state) => state.valuation.valuationObject
    )
    const valuationObjectsForValidation = useAppSelector(
        (state) => state.valuation.valuationObjectsForValidation
    )
    const valuationParametersStandardizedWeights = useAppSelector(
        (state) => state.valuation.valuationParametersStandardizedWeights
    )

    function createData(
        attribute: string,
        standardizedWeight: number,
        shareOfTheAmount: number,
        range: number,
        weightFactor: number,
        attributeValue: number
    ) {
        return {
            attribute,
            standardizedWeight,
            shareOfTheAmount,
            range,
            weightFactor,
            attributeValue,
        }
    }

    const rowsHeader: string[] = []
    rowsHeader.push(t('attribute'))
    rowsHeader.push(t('standardized weight'))
    rowsHeader.push(t('share of the amount'))
    rowsHeader.push(t('range'))
    rowsHeader.push(t('weight factor'))
    rowsHeader.push(valuationObject)

    const rows: { [key: string]: number | string }[] = []

    // for (let i = 0; i < Object.keys(valuationObjectParameters).length; i++) {
    //     const row: { [key: string]: number | string } = createData(
    //         Object.keys(valuationObjectParameters)[i],
    //         valuationObjects[i],
    //         valuationObjectsAreas[i],
    //         valuationObjectsParameters[i],
    //         valuationObjectsPrices[i],
    //         parseInt(
    //             (valuationObjectsPrices[i] / valuationObjectsAreas[i]).toFixed(
    //                 2
    //             )
    //         )
    //     )
    //     rows.push(row)
    // }

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
                    aria-label="valuation details table"
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
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ValuationCountTable
