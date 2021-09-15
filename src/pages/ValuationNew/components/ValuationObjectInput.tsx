import { Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'

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
        <Paper className={classes.paperObj} elevation={0}>
            <Typography className={classes.headerObj} variant="h5">
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
