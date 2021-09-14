import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../utils/hooks/useAppDispach'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: 20,
            padding: 20,
            display: 'flex',
            flexWrap: 'wrap',
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

const ValuationNavigation: React.FC<{ allowNext: boolean }> = ({
    allowNext,
}) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const finishedSteps = useAppSelector(
        (state) => state.valuation.finishedSteps
    )
    const dispatch = useAppDispatch()
    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h5">
                {t('Valuation Object')}
            </Typography>
            <Button disabled={allowNext}>Back</Button>
            <Button>Next</Button>
        </Paper>
    )
}

export default ValuationNavigation
