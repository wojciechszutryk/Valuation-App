import React, { useCallback, useMemo } from 'react'
import Table from '@material-ui/core/Table'
import { Checkbox, TableBody, Typography } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { setValuationObjectsForValuation } from 'data/state/actions/valuationActions'
import { listMostSimilarObjects } from 'utils/functions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useStyles } from './componentsStyles'

const ValuationDetailsTable = () => {
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
    const valuationParametersObjects = useAppSelector(
        (state) => state.valuation.valuationParametersObjects
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

    console.log(valuationObjects)

    useMemo(() => {
        const mostSimilarObjectsToValuationObjectIndexes =
            listMostSimilarObjects(
                valuationObjectsParameters,
                valuationObjectParameters
            )
        dispatch(
            setValuationObjectsForValuation(
                mostSimilarObjectsToValuationObjectIndexes
            )
        )
    }, [valuationObjectsParameters, valuationObjectParameters, dispatch])

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

    const rowsHeader: string[] = useMemo(() => {
        const rowsHeader: string[] = []
        rowsHeader.push(t('index'))
        rowsHeader.push(t('name'))
        rowsHeader.push(t('area'))
        rowsHeader.push(t('price'))
        rowsHeader.push(t('unit price'))
        rowsHeader.push.apply(rowsHeader, valuationParametersObjects)
        rowsHeader.push(t('for valuation'))
        return rowsHeader
    }, [valuationParametersObjects, t])

    const rows: { [key: string]: number | string }[] = useMemo(() => {
        const rows: { [key: string]: number | string }[] = []

        for (let i = 0; i < valuationObjects.length; i++) {
            const row: { [key: string]: number | string } = createData(
                i + 1,
                valuationObjects[i],
                valuationObjectsAreas[i],
                valuationObjectsParameters[i],
                valuationObjectsPrices[i],
                parseInt(
                    (
                        valuationObjectsPrices[i] / valuationObjectsAreas[i]
                    ).toFixed(2)
                )
            )
            rows.push(row)
        }
        return rows
    }, [
        createData,
        valuationObjects,
        valuationObjectsAreas,
        valuationObjectsPrices,
        valuationObjectsParameters,
    ])

    const valuationObjectRow = useMemo(
        () =>
            createData(
                valuationObjects.length + 1,
                valuationObject,
                valuationObjectArea,
                valuationObjectParameters
            ),
        [
            valuationObjects,
            createData,
            valuationObject,
            valuationObjectArea,
            valuationObjectParameters,
        ]
    )

    const handleCheckboxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
            let valuationObjectsForValidationCopy = [
                ...valuationObjectsForValidation,
            ]
            if (
                valuationObjectsForValidationCopy.includes(index) &&
                !event.target.checked
            )
                valuationObjectsForValidationCopy =
                    valuationObjectsForValidationCopy.filter(
                        (val) => val !== index
                    )
            else if (
                !valuationObjectsForValidationCopy.includes(index) &&
                event.target.checked
            )
                valuationObjectsForValidationCopy.push(index)
            else return
            dispatch(
                setValuationObjectsForValuation(
                    valuationObjectsForValidationCopy
                )
            )
        },
        [valuationObjectsForValidation, dispatch]
    )

    return (
        <>
            <Typography className={classes.header} variant="h2">
                {t('Valuation summary')}
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
                                <TableCell
                                    className={
                                        classes.tableBodyWithCheckboxCell
                                    }
                                >
                                    <Checkbox
                                        checked={valuationObjectsForValidation.includes(
                                            index
                                        )}
                                        color="secondary"
                                        onChange={(event) =>
                                            handleCheckboxChange(event, index)
                                        }
                                        inputProps={{
                                            'aria-label': 'checkbox',
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className={classes.tableBodyRow}>
                            {Object.values(valuationObjectRow).map(
                                (value, index) => (
                                    <TableCell
                                        key={index}
                                        className={
                                            classes.tableBodyValuationObjectRow
                                        }
                                    >
                                        {value}
                                    </TableCell>
                                )
                            )}
                            <TableCell
                                className={classes.tableBodyValuationObjectRow}
                            />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ValuationDetailsTable
