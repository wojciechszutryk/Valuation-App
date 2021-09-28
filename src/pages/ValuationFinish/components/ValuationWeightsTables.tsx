import clsx from 'clsx'
import React from 'react'
import Table from '@material-ui/core/Table'
import { TableBody, Typography } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { findObjectsWithOneNotEqualValue } from 'utils/functions'
import { useStyles } from './tableStyles'

const ValuationWeightsTables = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    const valuationParametersObjects = useAppSelector(
        (state) => state.valuation.valuationParametersObjects
    )
    const valuationObjectsParameters = useAppSelector(
        (state) => state.valuation.valuationObjectsParameters
    )
    const valuationObjectsAreas = useAppSelector(
        (state) => state.valuation.valuationObjectsAreas
    )
    const valuationObjectsPrices = useAppSelector(
        (state) => state.valuation.valuationObjectsPrices
    )
    const valuationObjects = useAppSelector(
        (state) => state.valuation.valuationObjects
    )

    function createData(
        index: number,
        name: string,
        properties: { [key: string]: number },
        unitPrice: number | null = null
    ) {
        return Object.assign({}, { index, name }, properties, {
            unitPrice,
        })
    }

    const unitPrices = valuationObjects.map((obj, index) => {
        return Number.parseFloat(
            (
                valuationObjectsPrices[index] / valuationObjectsAreas[index]
            ).toFixed(2)
        )
    })
    const minPrice = Math.min(...unitPrices)
    const maxPrice = Math.max(...unitPrices)
    const diffMaxMinPrice = maxPrice - minPrice

    const rowsHeader: string[] = []
    rowsHeader.push(t('index'))
    rowsHeader.push(t('name'))
    rowsHeader.push.apply(rowsHeader, valuationParametersObjects)
    rowsHeader.push(t('unit price'))
    rowsHeader.push(t('price difference'))
    rowsHeader.push(t('weight'))

    const rows: { [key: string]: number | string }[] = []

    for (let i = 0; i < valuationObjects.length; i++) {
        const row: { [key: string]: number | string } = createData(
            i + 1,
            valuationObjects[i],
            valuationObjectsParameters[i],
            unitPrices[i]
        )
        rows.push(row)
    }

    const similarParametersObjectsPairs = valuationParametersObjects.map(
        (key) =>
            findObjectsWithOneNotEqualValue(valuationObjectsParameters, key)
    )

    const diffPriceArray = similarParametersObjectsPairs.map((criteriaPairs) =>
        criteriaPairs.map((pair) =>
            Number.parseFloat(
                Math.abs(unitPrices[pair[1]] - unitPrices[pair[0]]).toFixed(2)
            )
        )
    )

    const weightsArray = similarParametersObjectsPairs.map((criteriaPairs) =>
        criteriaPairs.map((pair) =>
            Number.parseFloat(
                Math.abs(unitPrices[pair[1]] - unitPrices[pair[0]]).toFixed(2)
            )
        )
    )

    console.log(weightsArray)

    return (
        <div>
            <Typography variant="h2" className={classes.header}>
                {t('Criteria Weights')}
            </Typography>
            {similarParametersObjectsPairs.map((pairs, index) => (
                <TableContainer component={Paper} key={index} elevation={3}>
                    <Table
                        className={classes.table}
                        aria-label="valuation details table"
                    >
                        <TableHead>
                            <TableRow>
                                {rowsHeader.map((row, rowIndex) => (
                                    <TableCell
                                        key={rowIndex}
                                        className={clsx(
                                            classes.tableHeadCellWeights,
                                            rowIndex - 2 === index
                                                ? classes.important
                                                : null
                                        )}
                                    >
                                        {row}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pairs.map((pair, index) => (
                                <>
                                    <TableRow
                                        key={pair[0]}
                                        className={classes.tableBodyRowWeights}
                                    >
                                        {Object.values(rows[pair[0]]).map(
                                            (value, index) => (
                                                <TableCell
                                                    key={index}
                                                    className={
                                                        classes.tableBodyCell
                                                    }
                                                >
                                                    {value}
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                    <TableRow
                                        key={pair[1]}
                                        className={classes.tableBodyRowWeights}
                                    >
                                        {Object.values(rows[pair[1]]).map(
                                            (value, index) => (
                                                <TableCell
                                                    key={index}
                                                    className={
                                                        classes.tableBodyCell
                                                    }
                                                >
                                                    {value}
                                                </TableCell>
                                            )
                                        )}
                                        <TableCell
                                            className={classes.tableBodyCell}
                                        >
                                            {Math.abs(
                                                unitPrices[pair[1]] -
                                                    unitPrices[pair[0]]
                                            ).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </div>
    )
}

export default ValuationWeightsTables
