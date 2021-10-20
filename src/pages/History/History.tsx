import React, { useCallback, useMemo } from 'react'
import Table from '@material-ui/core/Table'
import { TableBody, Typography, Button } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { useStyles } from './styles'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchUserWorksFromAPI } from 'data/fetch/userFetch'
import { workDelete } from 'data/fetch/worksFetch'
import { useHistory } from 'react-router-dom'
import {
    fetchWorksValuationObjectFromAPI,
    fetchWorksFromAPI,
} from 'data/fetch/valuationsFetch'
import {
    setFinishedSteps,
    setParametersObjects,
    setParametersScale,
    setValuationObject,
    setValuationObjectArea,
    setValuationObjectParameters,
    setValuationObjects,
    setValuationObjectsAreas,
    setValuationObjectsParameters,
    setValuationObjectsPrices,
} from 'data/state/actions/valuationActions'
import { ValuationObjectInteface } from 'typings'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { showToast } from 'utils'

const History = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    let history = useHistory()
    const queryClient = useQueryClient();
    const userId = useAppSelector(
        (state) => state.user.userId
    )
    const userName = useAppSelector(
        (state) => state.user.userName
    )
    const { data: works } = useQuery(['works', { id: userId }], () => fetchUserWorksFromAPI({ id: userId }));
    const removeWorkMutation = useMutation(workDelete, {
        onSuccess: () => {
            queryClient.invalidateQueries('works');
        },
    });

    React.useEffect(() => {
        if (!userId) {
            history.goBack()
            showToast(
                t(
                    'You cant access that page before logging in'
                )
            )
        }
    }, [history, t, userId])

    const createData = useCallback(
        (
            index: number,
            date: string,
            parameters: string[]
        ) => {
            return Object.assign(
                {},
                { index, date, parameters },
            )
        },
        []
    )

    const rowsHeader: string[] = useMemo(() => {
        const rowsHeader: string[] = []
        rowsHeader.push(t('index'))
        rowsHeader.push(t('date'))
        rowsHeader.push(t('parameters'))
        rowsHeader.push(t('delete'))
        rowsHeader.push(t('open'))
        return rowsHeader
    }, [t])

    const rows: { [key: string]: string[] | number | string }[] = useMemo(() => {
        const rows: { [key: string]: string[] | string | number }[] = []
        for (let i = 0; i < works.length; i++) {
            const row: { [key: string]: string[] | string | number } = createData(
                i + 1,
                works[i].date,
                works[i].parameters
            )
            rows.push(row)
        }
        return rows
    }, [createData, works])

    const handleWorkDelete = React.useCallback((index: number) => {
        removeWorkMutation.mutate(works[index].id)
        showToast(
            t(
                'Work removed successfuly'
            )
        )
    }, [removeWorkMutation, t, works])

    const handleWorkOpen = React.useCallback(async (index: number) => {
        const workId = works[index].id
        const { parameters } = await fetchWorksFromAPI(
            workId
        )
        const allValuationObjects = await fetchWorksValuationObjectFromAPI(workId)
        const valuationObject = allValuationObjects.find((obj: ValuationObjectInteface) => (
            obj.isForValuation === true
        ))
        const valuationObjects = allValuationObjects.filter((obj: ValuationObjectInteface) => (
            obj.isForValuation === false
        ))
        const valuationObjectName = valuationObject.name;
        const valuationObjectArea = valuationObject.area;
        const valuationObjectParameters = valuationObject.parametersValues;
        const valuationObjectsNames = valuationObjects.map((obj: ValuationObjectInteface) => (
            obj.name
        ));
        const valuationObjectsAreas = valuationObjects.map((obj: ValuationObjectInteface) => (
            obj.area
        ));
        const valuationObjectsPrices = valuationObjects.map((obj: ValuationObjectInteface) => (
            obj.price
        ));

        const valuationObjectsParameters = await valuationObjects
            .map((obj: ValuationObjectInteface) => {
                return obj.parametersValues
            })

        const valuationParametersObjects = parameters;

        dispatch(setValuationObject(valuationObjectName))
        dispatch(setValuationObjects(valuationObjectsNames))
        dispatch(setFinishedSteps(2))
        dispatch(setParametersObjects(valuationParametersObjects))
        dispatch(setValuationObjectParameters(valuationObjectParameters))
        dispatch(setValuationObjectsParameters(valuationObjectsParameters))
        dispatch(setValuationObjectsAreas(valuationObjectsAreas))
        dispatch(setValuationObjectsPrices(valuationObjectsPrices))
        dispatch(setValuationObjectArea(valuationObjectArea))
        dispatch(
            setParametersScale([
                Math.min(...valuationObjectsParameters.concat(valuationObjectParameters)),
                Math.max(...valuationObjectsParameters.concat(valuationObjectParameters)),
            ])
        )
        showToast(
            t(
                'Valuation loaded successfuly'
            )
        )
        history.push('/valuation/new')
    }, [dispatch, history, t, works])

    return (
        <>
            <Typography className={classes.header} variant="h2">
                {userName + ' ' + t('history') + ':'}
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
                                    className={classes.tableBodyCell}
                                >
                                    <Button
                                        onClick={() => handleWorkDelete(index)}
                                    />
                                </TableCell>
                                <TableCell
                                    className={classes.tableBodyCell}
                                >
                                    <Button
                                        onClick={() => handleWorkOpen(index)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default History