import { Avatar, Button, Paper, TextField, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useState } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useTranslation } from 'react-i18next'
import { showToast, findDuplicatesInArray } from 'utils'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginBottom: 20,
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

const ValuationObjectsForm: React.FC = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    const [valuationCriteria, setValuationCriteria] = useState<string[]>([''])

    const handleAddTextField = () => {
        if (valuationCriteria[valuationCriteria.length - 1] === '') {
            showToast(t('Fill previous object before adding new one'))
            return
        }
        if (findDuplicatesInArray(valuationCriteria)) {
            showToast(t('There are two criteria with same name'))
            return
        }
        const valuationCriteriaCopy = [...valuationCriteria]
        valuationCriteriaCopy.push('')
        setValuationCriteria(valuationCriteriaCopy)
    }

    function handleTextFieldChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        id: number
    ) {
        const indexOfField = id
        const valuationCriteriaCopy = [...valuationCriteria]
        valuationCriteriaCopy[indexOfField] = e.target.value
        setValuationCriteria(valuationCriteriaCopy)
    }

    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h5">
                {t('Define valuation objects')}
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
                                label="Address or name"
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

export default ValuationObjectsForm
