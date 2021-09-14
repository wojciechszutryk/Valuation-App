import { Box, Paper, TextField, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginBottom: 20,
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

type Props = {
    valuationObject: string
    setValuationObject: (valuationObject: string) => void
}

const ValuationObjectInput = ({
    valuationObject,
    setValuationObject,
}: Props) => {
    const { t } = useTranslation()
    const classes = useStyles()

    function handleTextFieldChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        setValuationObject(e.target.value)
    }

    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h5">
                {t('Valuation Object')}
            </Typography>
            <TextField
                size="small"
                className={classes.textField}
                label={t('Address or name')}
                variant="outlined"
                onChange={(e) => handleTextFieldChange(e)}
                value={valuationObject}
            />
        </Paper>
    )
}

export default ValuationObjectInput
