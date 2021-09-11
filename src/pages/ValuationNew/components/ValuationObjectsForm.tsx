import { Avatar, Button, Paper, TextField, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useState } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useTranslation } from 'react-i18next'
import { showToast } from '../../../utils'

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

const ValuationObjectsForm: React.FC = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    const [valuationObjects, setValidationObjects] = useState<string[]>([''])

    const handleAddTextField = () => {
        if (valuationObjects[valuationObjects.length - 1] === '') {
            showToast(t('Fill previous object before adding new one'))
            return
        }
        const valuationObjectsCopy = [...valuationObjects]
        valuationObjectsCopy.push('')
        setValidationObjects(valuationObjectsCopy)
    }

    function handleTextFieldChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        id: string
    ) {
        const indexOfField = parseInt(id)
        const valuationObjectsCopy = [...valuationObjects]
        valuationObjectsCopy[indexOfField] = e.target.value
        setValidationObjects(valuationObjectsCopy)
    }

    console.log(valuationObjects)

    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h5">
                Define valuation objects
            </Typography>
            <form className={classes.form}>
                {valuationObjects.map((object) => (
                    <div className={classes.objectWrapper} key={object}>
                        <Avatar className={classes.avatar} variant="rounded">
                            {valuationObjects.indexOf(object)}
                        </Avatar>
                        <TextField
                            id={valuationObjects.indexOf(object).toString()}
                            size="small"
                            className={classes.textField}
                            label="Address or name"
                            variant="outlined"
                            onChange={(e) =>
                                handleTextFieldChange(
                                    e,
                                    valuationObjects.indexOf(object).toString()
                                )
                            }
                            // value={
                            //     valuationObjects[
                            //         valuationObjects.indexOf(object) - 1
                            //     ]
                            // }
                        />
                    </div>
                ))}
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
