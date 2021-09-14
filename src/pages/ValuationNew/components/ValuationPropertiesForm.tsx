import { Avatar, Button, Paper, TextField, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { findDuplicatesInArray, showToast } from '../../../utils'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: 20,
        },
        header: {
            marginBottom: theme.spacing(2),
        },
        form: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        objectWrapper: {
            flexBasis: '100%',
            display: 'flex',
        },
        avatar: {
            backgroundColor: theme.palette.primary.light,
        },
        textField: {
            flexGrow: 1,
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(0.5),
        },
        newButton: {
            flexBasis: '100%',
        },
    })
)

type Props = {
    valuationCriteria: string[]
    setValuationCriteria: (valuationCriteria: string[]) => void
}

const ValuationPropertiesForm = ({
    valuationCriteria,
    setValuationCriteria,
}: Props) => {
    const classes = useStyles()
    const { t } = useTranslation()

    const handleAddTextField = () => {
        if (valuationCriteria[valuationCriteria.length - 1] === '') {
            showToast(t('Fill previous object before adding new one'))
            return
        }
        if (findDuplicatesInArray(valuationCriteria)) {
            showToast(t('There are two objects with same name'))
            return
        }
        const valuationObjectsCopy = [...valuationCriteria]
        valuationObjectsCopy.push('')
        setValuationCriteria(valuationObjectsCopy)
    }

    function handleTextFieldChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        id: number
    ) {
        const indexOfField = id
        const valuationObjectsCopy = [...valuationCriteria]
        valuationObjectsCopy[indexOfField] = e.target.value
        setValuationCriteria(valuationObjectsCopy)
    }

    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h5">
                {t('Define valuation criteria')}
            </Typography>
            <form className={classes.form}>
                {valuationCriteria.map((object, index) => {
                    return (
                        <div className={classes.objectWrapper} key={index}>
                            <Avatar
                                className={classes.avatar}
                                variant="rounded"
                            >
                                {index + 1}
                            </Avatar>
                            <TextField
                                id={index.toString()}
                                size="small"
                                className={classes.textField}
                                label={t('Criterion name')}
                                variant="outlined"
                                onChange={(e) =>
                                    handleTextFieldChange(e, index)
                                }
                                value={valuationCriteria[index]}
                            />
                        </div>
                    )
                })}
                <Button
                    onClick={handleAddTextField}
                    className={classes.newButton}
                    variant="outlined"
                    fullWidth
                >
                    <AddCircleIcon fontSize="small" />
                </Button>
            </form>
        </Paper>
    )
}

export default ValuationPropertiesForm
