import { TableBody, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useStyles } from './tableStyles'

interface Props {
    valuationObjectParameters: { [key: string]: number }
    valuationObjectsParameters: { [key: string]: number }[]
    shareFactors: number[]
    valuationObject: string
    valuationParametersObjects: string[]
}

const ValuationComparisonTables = ({
    valuationObjectParameters,
    valuationObjectsParameters,
    shareFactors,
    valuationObject,
    valuationParametersObjects,
}: Props) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const valuationObjectsForValidationIndexes = useAppSelector(
        (state) => state.valuation.valuationObjectsForValidation
    )
    const valuationObjects = useAppSelector(
        (state) => state.valuation.valuationObjects
    )

    const valuationObjectsForValidationNames = useMemo(
        () =>
            valuationObjects.filter((object, index) =>
                valuationObjectsForValidationIndexes.includes(index)
            ),
        [valuationObjectsForValidationIndexes, valuationObjects]
    )

    const createData = useCallback(
        (
            attribute: string,
            weightFactor: number,
            objectName: number,
            valuationObject: number,
            attributeDifference: number,
            correction: number
        ) => {
            return Object.assign(
                {},
                {
                    attribute,
                    weightFactor,
                    objectName,
                    valuationObject,
                    attributeDifference,
                    correction,
                }
            )
        },
        []
    )

    const rowsHeadersArray: string[][] = useMemo(() => {
        return valuationObjectsForValidationNames.map((objectName) => {
            const rowsHeader: string[] = []
            rowsHeader.push(t('attribute'))
            rowsHeader.push(t('weight factor'))
            rowsHeader.push(objectName)
            rowsHeader.push(valuationObject)
            rowsHeader.push(t('attribute difference'))
            rowsHeader.push(t('correction'))
            return rowsHeader
        })
    }, [valuationObjectsForValidationNames, valuationObject, t])

    const rowsBodyArray: { [key: string]: number | string }[][] =
        useMemo(() => {
            return valuationObjectsForValidationIndexes.map((objectIndex) => {
                const rows: { [key: string]: number | string }[] = []
                for (let i = 0; i < valuationParametersObjects.length; i++) {
                    const attrDiff = Math.abs(
                        Object.values(valuationObjectsParameters[objectIndex])[
                            i
                        ] - Object.values(valuationObjectParameters)[i]
                    )
                    const row: { [key: string]: number | string } = createData(
                        valuationParametersObjects[i],
                        shareFactors[i],
                        Object.values(valuationObjectsParameters[objectIndex])[
                            i
                        ],
                        Object.values(valuationObjectParameters)[i],
                        attrDiff,
                        attrDiff * Number.parseFloat(shareFactors[i].toFixed(2))
                    )
                    rows.push(row)
                }
                return rows
            })
        }, [
            createData,
            valuationObjects,
            valuationObjectsParameters,
            valuationParametersObjects,
            valuationObjectParameters,
            shareFactors,
            valuationObject,
            valuationObjectsForValidationIndexes,
        ])

    return (
        <>
            {rowsBodyArray.map((rows, index) => (
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
                                {rowsHeadersArray[index].map((row, index) => (
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
            ))}
        </>
    )
}

export default ValuationComparisonTables
