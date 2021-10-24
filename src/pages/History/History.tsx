import React, { useCallback, useMemo, useState } from 'react'
import Table from '@material-ui/core/Table'
import { TableBody, Typography, Button, Container } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'
import Skeleton from '@material-ui/lab/Skeleton'
import { ClipLoader, ClockLoader } from 'react-spinners'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
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
import { useTheme } from '@material-ui/core/styles'

const History = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    let history = useHistory()
    const theme = useTheme()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const userId = useAppSelector((state) => state.user.userId)
    const userName = useAppSelector((state) => state.user.userName)
    const { data: works, isFetching } = useQuery(
        ['works', { id: userId }],
        () => fetchUserWorksFromAPI({ id: userId })
    )
    const removeWorkMutation = useMutation((id: string) => workDelete({ id }), {
        onSuccess: () => {
            queryClient.invalidateQueries('works')
        },
    })

    React.useEffect(() => {
        if (!userId) {
            history.goBack()
            showToast(t('You cant access that page before logging in'))
        }
    }, [history, t, userId])

    const createData = useCallback(
        (index: number, date: string, parameters: string[]) => {
            return Object.assign({}, { index, date, parameters })
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

    const rows: { [key: string]: string[] | number | string }[] =
        useMemo(() => {
            if (!works) return []
            const rows: { [key: string]: string[] | string | number }[] = []
            for (let i = 0; i < works.length; i++) {
                const row: { [key: string]: string[] | string | number } =
                    createData(
                        i + 1,
                        works[i].date,
                        works[i].parameters.join(', ')
                    )
                rows.push(row)
            }
            return rows
        }, [createData, works])

    const handleWorkDelete = React.useCallback(
        (index: number) => {
            const workId = works[index].id
            removeWorkMutation.mutate(workId)
            showToast(t('Work removed successfuly'))
        },
        [removeWorkMutation, t, works]
    )

    const handleWorkOpen = React.useCallback(
        async (index: number) => {
            setLoading(true)
            const workId = works[index].id
            const { parameters } = await fetchWorksFromAPI(workId)
            const allValuationObjects = await fetchWorksValuationObjectFromAPI(
                workId
            )
            const valuationObject = await allValuationObjects.find(
                (obj: ValuationObjectInteface) => obj.isForValuation
            )
            const valuationObjects = await allValuationObjects.filter(
                (obj: ValuationObjectInteface) => !obj.isForValuation
            )

            const valuationObjectName = await valuationObject.name
            const valuationObjectArea = await valuationObject.area
            const valuationObjectParameters =
                await valuationObject.parametersValues
            const valuationObjectsNames = await valuationObjects.map(
                (obj: ValuationObjectInteface) => obj.name
            )
            const valuationObjectsAreas = await valuationObjects.map(
                (obj: ValuationObjectInteface) => obj.area
            )
            const valuationObjectsPrices = await valuationObjects.map(
                (obj: ValuationObjectInteface) => obj.price
            )

            const valuationObjectsParameters = await valuationObjects.map(
                (obj: ValuationObjectInteface) => {
                    return obj.parametersValues
                }
            )
            const valuationParametersObjects = await parameters
            dispatch(setValuationObject(valuationObjectName))
            dispatch(setValuationObjects(valuationObjectsNames))
            dispatch(setFinishedSteps(0))
            dispatch(setParametersObjects(valuationParametersObjects))
            dispatch(setValuationObjectParameters(valuationObjectParameters))
            dispatch(setValuationObjectsParameters(valuationObjectsParameters))
            dispatch(setValuationObjectsAreas(valuationObjectsAreas))
            dispatch(setValuationObjectsPrices(valuationObjectsPrices))
            dispatch(setValuationObjectArea(valuationObjectArea))
            dispatch(
                setParametersScale([
                    Math.min(
                        ...valuationObjectsParameters
                            .concat(valuationObjectParameters)
                            .flat()
                    ),
                    Math.max(
                        ...valuationObjectsParameters
                            .concat(valuationObjectParameters)
                            .flat()
                    ),
                ])
            )
            showToast(t('Valuation loaded successfuly'))
            setLoading(false)
            history.push('/valuation/new')
        },
        [dispatch, history, t, works]
    )

    if (loading)
        return (
            <Container className={classes.loaderCenter}>
                <ClockLoader size={150} color={theme.palette.secondary.dark} />
                <Typography className={classes.loadingText}>
                    {t('Loading work') + '...'}
                </Typography>
            </Container>
        )

    return (
        <Container className={classes.container}>
            <Typography className={classes.header} variant="h2">
                {t('history of user') + ' ' + userName + ':'}
            </Typography>
            {isFetching || removeWorkMutation.isLoading ? (
                <Container className={classes.container}>
                    <div className={classes.root}>
                        <Skeleton height={50} />
                        <Skeleton animation={false} height={50} />
                        <Skeleton animation="wave" height={50} />
                    </div>
                </Container>
            ) : (
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
                                            onClick={() =>
                                                handleWorkDelete(index)
                                            }
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableBodyCell}
                                    >
                                        <Button
                                            onClick={() =>
                                                handleWorkOpen(index)
                                            }
                                        >
                                            <CloudDownloadIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    )
}

export default History
