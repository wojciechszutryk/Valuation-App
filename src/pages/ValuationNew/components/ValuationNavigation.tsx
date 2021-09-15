import { Button, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import {
    setFinishedSteps,
    setParametersObjects,
    setParametersScale,
    setValuationObject,
    setValuationObjects,
} from 'data/state/actions/valuationActions'
import { compareArrays } from '../../../utils/functions/compareArrays'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: 20,
            padding: 20,
            display: 'flex',
            flexWrap: 'wrap',
            [theme.breakpoints.up('md')]: {
                marginTop: 0,
                marginBottom: 20,
            },
        },
        avatar: {
            backgroundColor: theme.palette.primary.light,
        },
        textField: {
            flexGrow: 1,
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(0.5),
        },
        header: {
            color: theme.palette.primary.light,
            lineHeight: 1.7,
        },
    })
)

const ValuationNavigation: React.FC<{
    valuationObject: string
    valuationCriteria: string[]
    valuationObjects: string[]
    valueCriteriaScale: number[]
}> = ({
    valuationObject,
    valuationCriteria,
    valuationObjects,
    valueCriteriaScale,
}) => {
    const history = useHistory()
    const { t } = useTranslation()
    const classes = useStyles()
    const dispatch = useAppDispatch()

    function handleSubmit() {
        dispatch(setValuationObject(valuationObject))
        dispatch(setParametersScale(valueCriteriaScale))
        dispatch(setParametersObjects(valuationCriteria))
        dispatch(setValuationObjects(valuationObjects))
        dispatch(setFinishedSteps(1))
        history.push('/valuation/details')
    }

    console.log(
        compareArrays(valuationObjects, ['']),
        compareArrays(valuationCriteria, ['']),
        valuationObject === ''
    )

    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h5">
                {t('Valuation Object')}
            </Typography>
            <Button
                disabled={
                    compareArrays(valuationObjects, ['']) ||
                    compareArrays(valuationCriteria, ['']) ||
                    valuationObject === ''
                }
                onClick={handleSubmit}
            >
                Next
            </Button>
        </Paper>
    )
}

export default ValuationNavigation
