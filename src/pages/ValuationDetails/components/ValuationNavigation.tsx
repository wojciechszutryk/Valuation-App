import { Button, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { setFinishedSteps } from 'data/state/actions/valuationActions'
import { showToast } from 'utils'
import { useAppSelector } from 'utils/hooks/useAppSelector'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: 20,
            padding: 20,
            display: 'flex',
            '& h5': {
                flexGrow: 1,
            },
        },
        header: {
            color: theme.palette.primary.light,
            lineHeight: 1.7,
        },
    })
)

const ValuationNavigation: React.FC = () => {
    const valuationObjectsAreas = useAppSelector(
        (state) => state.valuation.valuationObjectsAreas
    )
    const valuationObjectsPrices = useAppSelector(
        (state) => state.valuation.valuationObjectsPrices
    )
    const valuationObjectArea = useAppSelector(
        (state) => state.valuation.valuationObjectArea
    )
    const history = useHistory()
    const { t } = useTranslation()
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const handleSubmit = useCallback(() => {
        if (valuationObjectArea === 0 || valuationObjectsAreas.includes(0)) {
            showToast(t('Valuation object price can not be unset'))
            return
        }
        if (valuationObjectsPrices.includes(0)) {
            showToast(t('Valuation object area can not be unset'))
            return
        }
        dispatch(setFinishedSteps(2))
        history.push('/valuation/finish')
    }, [
        history,
        t,
        dispatch,
        valuationObjectArea,
        valuationObjectsAreas,
        valuationObjectsPrices,
    ])

    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h5">
                {t('Make sure the details are correct and continue.')}
            </Typography>
            <Button onClick={() => history.push('/valuation/new')}>
                {t('BACK')}
            </Button>
            <Button onClick={handleSubmit}>{t('NEXT')}</Button>
        </Paper>
    )
}

export default ValuationNavigation
