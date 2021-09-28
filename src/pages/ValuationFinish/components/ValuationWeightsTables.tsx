import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import { TableBody } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { findObjectsWithOneNotEqualValue } from '../../../utils/functions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        tableHeadCell: {
            padding: '8px',
            textTransform: 'capitalize',
            backgroundColor:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : theme.palette.secondary.main,
            color: 'white',
        },
        tableBodyCell: {
            padding: '5px 8px',
        },
        tableBodyRow: {
            '&:nth-child(2n+1)': {
                backgroundColor:
                    theme.palette.type === 'dark' ? '#5d5d5d' : '#e6e6ff',
            },
        },
    })
)

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
        return Object.assign({}, { index, name }, properties, { unitPrice })
    }

    const unitPrices = valuationObjects.map((obj, index) => {
        return parseInt(
            (
                valuationObjectsPrices[index] / valuationObjectsAreas[index]
            ).toFixed(2)
        )
    })

    const rowsHeader: string[] = []
    rowsHeader.push(t('index'))
    rowsHeader.push(t('name'))
    rowsHeader.push.apply(rowsHeader, valuationParametersObjects)
    rowsHeader.push(t('unit price'))

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

    console.log(similarParametersObjectsPairs)

    return (
        <div>
            {similarParametersObjectsPairs.map((pairs, index) => (
                <TableContainer component={Paper} key={index} elevation={0}>
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
                            {pairs.map((pair, index) => (
                                <>
                                    <TableRow
                                        key={pair[0]}
                                        className={classes.tableBodyRow}
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
                                        key={index}
                                        className={classes.tableBodyRow}
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
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </div>
    )

    // <TableContainer component={Paper} elevation={0}>
    //     <Table
    //         className={classes.table}
    //         aria-label="valuation details table"
    //     >
    //         <TableHead>
    //             <TableRow>
    //                 {rowsHeader.map((row, index) => (
    //                     <TableCell
    //                         key={index}
    //                         className={classes.tableHeadCell}
    //                     >
    //                         {row}
    //                     </TableCell>
    //                 ))}
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             {rows.map((row, index) => (
    //                 <TableRow key={index} className={classes.tableBodyRow}>
    //                     {Object.values(row).map((value, index) => (
    //                         <TableCell
    //                             key={index}
    //                             className={classes.tableBodyCell}
    //                         >
    //                             {value}
    //                         </TableCell>
    //                     ))}
    //                 </TableRow>
    //             ))}
    //         </TableBody>
    //     </Table>
    // </TableContainer>
}

export default ValuationWeightsTables
