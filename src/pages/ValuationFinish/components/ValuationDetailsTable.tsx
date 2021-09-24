import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import { TableBody } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

const ValuationDetailsTable = () => {
    const classes = useStyles()
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

    function createData(
        index: number,
        name: string,
        area: number,
        properties: { [key: string]: number },
        price: number | null = null,
        unitPrice: number | null = null
    ) {
        return Object.assign(
            {},
            { index, name, area, price, unitPrice },
            properties
        )
    }

    const rowsHeader: string[] = []
    rowsHeader.push(t('index'))
    rowsHeader.push(t('name'))
    rowsHeader.push(t('area'))
    rowsHeader.push(t('price'))
    rowsHeader.push(t('unit price'))
    rowsHeader.push.apply(rowsHeader, Object.keys(valuationObjectParameters))

    const rows: { [key: string]: number | string }[] = []

    for (let i = 0; i < valuationObjects.length; i++) {
        const row: { [key: string]: number | string } = createData(
            i + 1,
            valuationObjects[i],
            valuationObjectsAreas[i],
            valuationObjectsParameters[i],
            valuationObjectsPrices[i],
            parseInt(
                (valuationObjectsPrices[i] / valuationObjectsAreas[i]).toFixed(
                    2
                )
            )
        )
        rows.push(row)
    }
    rows.push(
        createData(
            valuationObjects.length,
            valuationObject,
            valuationObjectArea,
            valuationObjectParameters
        )
    )

    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                aria-label="valuation details table"
            >
                <TableHead>
                    <TableRow>
                        {rowsHeader.map((row, index) => (
                            <TableCell key={index}>{row}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {Object.values(row).map((value, index) => (
                                <TableCell key={index} align="right">
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ValuationDetailsTable
