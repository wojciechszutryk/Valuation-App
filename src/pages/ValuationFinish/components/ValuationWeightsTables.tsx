import clsx from 'clsx'
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
import { findObjectsWithOneNotEqualValue } from 'utils/functions'
import { setValuationParametersStandardizedWeights } from 'data/state/actions/valuationActions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useStyles } from './componentsStyles'
import { setValuationErrorInWeights } from 'data/state/actions/valuationActions'

const ValuationWeightsTables = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
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

    const createData = useCallback(
        (
            index: number,
            name: string,
            properties: { [key: string]: number },
            unitPrice: number | null = null
        ) => {
            return Object.assign({}, { index, name }, properties, {
                unitPrice,
            })
        },
        []
    )

    const unitPrices = useMemo(
        () =>
            valuationObjects.map((obj, index) => {
                return Number.parseFloat(
                    (
                        valuationObjectsPrices[index] /
                        valuationObjectsAreas[index]
                    ).toFixed(2)
                )
            }),
        [valuationObjects, valuationObjectsPrices, valuationObjectsAreas]
    )
    const minPrice = useMemo(() => Math.min(...unitPrices), [unitPrices])
    const maxPrice = useMemo(() => Math.max(...unitPrices), [unitPrices])
    const diffMaxMinPrice = useMemo(
        () => maxPrice - minPrice,
        [maxPrice, minPrice]
    )

    const rowsHeader: string[] = useMemo(() => {
        const rowsHeader = []
        rowsHeader.push(t('index'))
        rowsHeader.push(t('name'))
        rowsHeader.push.apply(rowsHeader, valuationParametersObjects)
        rowsHeader.push(t('unit price'))
        rowsHeader.push(t('price difference'))
        rowsHeader.push(t('weight'))
        return rowsHeader
    }, [valuationParametersObjects, t])

    const rows: { [key: string]: number | string }[] = useMemo(() => {
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
        return rows
    }, [valuationObjects, valuationObjectsParameters, unitPrices, createData])

    const similarParametersObjectsPairs = useMemo(
        () =>
            valuationParametersObjects.map((key) =>
                findObjectsWithOneNotEqualValue(valuationObjectsParameters, key)
            ),
        [valuationObjectsParameters, valuationParametersObjects]
    )

    const diffPriceArray = useMemo(
        () =>
            similarParametersObjectsPairs.map((criteriaPairs: number[][]) =>
                criteriaPairs.map((pair: number[]) =>
                    Number.parseFloat(
                        Math.abs(
                            unitPrices[pair[1]] - unitPrices[pair[0]]
                        ).toFixed(2)
                    )
                )
            ),
        [similarParametersObjectsPairs, unitPrices]
    )

    const weightsArrays = useMemo(
        () =>
            diffPriceArray.map((categoryPricesArray) =>
                categoryPricesArray.map((price) =>
                    Number.parseFloat((price / diffMaxMinPrice).toFixed(2))
                )
            ),
        [diffPriceArray, diffMaxMinPrice]
    )

    const weights = useMemo(
        () =>
            weightsArrays.map((weightsArray) => {
                const weightsSum = weightsArray.reduce(
                    (previousValue, currentValue) =>
                        previousValue + currentValue,
                    0
                )
                return Number.parseFloat(
                    ((100 * weightsSum) / weightsArray.length).toFixed(2)
                )
            }),
        [weightsArrays]
    )

    const weightsSum = useMemo(
        () =>
            weights.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
            ),
        [weights]
    )

    const standardizedWeights = useMemo(() => {
        const standardizedWeights = weights.map((weight) =>
            Number.parseFloat(((100 * weight) / weightsSum).toFixed(2))
        )
        dispatch(setValuationParametersStandardizedWeights(standardizedWeights))
        return standardizedWeights
    }, [weightsSum, weights, dispatch])

    const weightsErrorsIndexes: number[] = useMemo(() => {
        const weightsErrorsIndexes: number[] = []
        standardizedWeights.forEach((weight, index) => {
            if (!weight) {
                weightsErrorsIndexes.push(index)
            }
        })
        dispatch(setValuationErrorInWeights(weightsErrorsIndexes))
        return weightsErrorsIndexes;
    }, [standardizedWeights, dispatch])

    return (

        weightsErrorsIndexes.length === 0 ? <div>
            <Typography variant="h2" className={classes.header}>
                {t('Criteria Weights')}
            </Typography>
            {similarParametersObjectsPairs.map((pairs, index) => (
                <TableContainer
                    component={Paper}
                    key={index}
                    elevation={0}
                    className={classes.tableContainer}
                >
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
                            {pairs.map((pair, pairIndex) => (
                                <React.Fragment key={pairIndex}>
                                    <TableRow
                                        hover={true}
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
                                        <TableCell
                                            className={classes.tableBodyCell}
                                        />
                                        <TableCell
                                            className={classes.tableBodyCell}
                                        />
                                    </TableRow>
                                    <TableRow
                                        hover={true}
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
                                            {diffPriceArray[index][pairIndex]}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableBodyCell}
                                        >
                                            {weightsArrays[index][pairIndex]}
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                            <TableRow
                                className={classes.tableBodyRowWeightsValues}
                            >
                                <TableCell colSpan={2}>
                                    {valuationParametersObjects[index]}
                                </TableCell>
                                <TableCell colSpan={2}>
                                    {t('weight')}
                                    {': '}
                                    {weights[index]}%
                                </TableCell>
                                <TableCell colSpan={100}>
                                    {t('standardized weight')}
                                    {': '}
                                    {standardizedWeights[index]}%
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </div> : null
    )
}

export default ValuationWeightsTables
