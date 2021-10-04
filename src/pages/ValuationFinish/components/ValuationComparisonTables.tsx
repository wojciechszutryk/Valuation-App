import { TableBody, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import clsx from 'clsx'
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
    valuationObjectsPrices: number[]
}

const ValuationComparisonTables = ({
    valuationObjectParameters,
    valuationObjectsParameters,
    shareFactors,
    valuationObject,
    valuationParametersObjects,
    valuationObjectsPrices,
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

    const valuationObjectsForValidationPrices = useMemo(
        () =>
            valuationObjectsPrices.filter((object, index) =>
                valuationObjectsForValidationIndexes.includes(index)
            ),
        [valuationObjectsForValidationIndexes, valuationObjectsPrices]
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
            rowsHeader.push(valuationObject)
            rowsHeader.push(objectName)
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
                    const attrDiff =
                        Object.values(valuationObjectParameters)[i] -
                        Object.values(valuationObjectsParameters[objectIndex])[
                            i
                        ]

                    const row: { [key: string]: number | string } = createData(
                        valuationParametersObjects[i],
                        shareFactors[i],
                        Object.values(valuationObjectParameters)[i],
                        Object.values(valuationObjectsParameters[objectIndex])[
                            i
                        ],
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

    const correctionsSumArray: number[] = useMemo(
        () =>
            valuationObjectsForValidationIndexes.map((objectIndex) => {
                let sum = 0
                for (let i = 0; i < valuationParametersObjects.length; i++) {
                    const attrDiff =
                        Object.values(valuationObjectParameters)[i] -
                        Object.values(valuationObjectsParameters[objectIndex])[
                            i
                        ]

                    sum += shareFactors[i] * attrDiff
                }
                return sum
            }),
        [
            shareFactors,
            valuationObjectsForValidationIndexes,
            valuationObjectParameters,
            valuationParametersObjects,
            valuationObjectsParameters,
        ]
    )

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
                            <TableRow className={classes.tableBodyRow}>
                                <TableCell
                                    key={index}
                                    colSpan={3}
                                    className={clsx(
                                        classes.tableBodyCell,
                                        classes.upperCase,
                                        classes.alignRight
                                    )}
                                >
                                    {t('Corrections sum') + ' :'}
                                </TableCell>
                                <TableCell
                                    colSpan={100}
                                    key={index}
                                    className={classes.tableBodyCell}
                                >
                                    {correctionsSumArray[index].toFixed(2)}
                                </TableCell>
                            </TableRow>
                            <TableRow className={classes.tableBodyRow}>
                                <TableCell
                                    key={index}
                                    colSpan={3}
                                    className={clsx(
                                        classes.tableBodyCell,
                                        classes.upperCase,
                                        classes.alignRight
                                    )}
                                >
                                    {t('price') + ' :'}
                                </TableCell>
                                <TableCell
                                    key={index}
                                    colSpan={100}
                                    className={classes.tableBodyCell}
                                >
                                    {valuationObjectsForValidationPrices[
                                        index
                                    ].toFixed(2)}
                                </TableCell>
                            </TableRow>
                            <TableRow className={classes.tableBodyRow}>
                                <TableCell
                                    key={index}
                                    colSpan={3}
                                    className={clsx(
                                        classes.tableBodyCell,
                                        classes.upperCase,
                                        classes.alignRight
                                    )}
                                >
                                    {t('suggested price') + ' :'}
                                </TableCell>
                                <TableCell
                                    key={index}
                                    colSpan={100}
                                    className={clsx(
                                        classes.tableBodyCell,
                                        classes.upperCase,
                                        classes.alignRight
                                    )}
                                >
                                    {Number.parseFloat(
                                        valuationObjectsForValidationPrices[
                                            index
                                        ].toFixed(2)
                                    ) +
                                        Number.parseFloat(
                                            correctionsSumArray[index].toFixed(
                                                2
                                            )
                                        )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </>
    )
}

export default ValuationComparisonTables
