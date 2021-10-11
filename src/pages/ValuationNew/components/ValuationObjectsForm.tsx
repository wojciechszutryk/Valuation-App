import { Avatar, Button, Paper, TextField, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useTranslation } from 'react-i18next'
import { showToast, findDuplicatesInArray } from 'utils'
import {
    setFinishedSteps,
    setValuationObjectsAreas,
    setValuationObjectsCoordinates,
    setValuationObjectsParameters,
    setValuationObjectsPrices,
} from '../../../data/state/actions/valuationActions'
import { useAppDispatch } from '../../../utils/hooks/useAppDispach'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useStyles } from './styles'

type Props = {
    valuationObjects: string[]
    setValidationObjects: (valuationObjects: string[]) => void
}

const ValuationObjectsForm = ({
    valuationObjects,
    setValidationObjects,
}: Props) => {
    const valuationObjectsPrices = useAppSelector(
        (state) => state.valuation.valuationObjectsPrices
    )
    const valuationObjectsAreas = useAppSelector(
        (state) => state.valuation.valuationObjectsAreas
    )
    const valuationObjectsCoordinates = useAppSelector(
        (state) => state.valuation.valuationObjectsCoordinates
    )
    const valuationObjectsParameters = useAppSelector(
        (state) => state.valuation.valuationObjectsParameters
    )
    const { t } = useTranslation()
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const handleAddTextField = () => {
        if (valuationObjects[valuationObjects.length - 1] === '') {
            showToast(t('Fill previous object before adding new one'))
            return
        }
        if (findDuplicatesInArray(valuationObjects)) {
            showToast(t('There are two criteria with same name'))
            return
        }
        const valuationCriteriaCopy = [...valuationObjects]
        valuationCriteriaCopy.push('')
        setValidationObjects(valuationCriteriaCopy)
    }

    function handleTextFieldChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        id: number
    ) {
        const indexOfField = id
        const valuationCriteriaCopy = [...valuationObjects]
        valuationCriteriaCopy[indexOfField] = e.target.value
        setValidationObjects(valuationCriteriaCopy)
    }

    function handleDeleteObject(index: number) {
        const valuationObjectsCopy = [...valuationObjects]
        valuationObjectsCopy.splice(index, 1)
        setValidationObjects(valuationObjectsCopy)
        // if (valuationObjectsPrices[index] !== 0) {
        const valuationObjectsPricesCopy = [...valuationObjectsPrices]
        valuationObjectsPricesCopy.splice(index, 1)
        dispatch(setValuationObjectsPrices(valuationObjectsPricesCopy))
        // }
        // if (valuationObjectsAreas[index] !== 0) {
        const valuationObjectsAreasCopy = [...valuationObjectsAreas]
        valuationObjectsAreasCopy.splice(index, 1)
        dispatch(setValuationObjectsAreas(valuationObjectsAreasCopy))
        // }
        // if (valuationObjectsCoordinates[index][0] !== null) {
        const valuationObjectsCoordinatesCopy = [...valuationObjectsCoordinates]
        valuationObjectsCoordinatesCopy.splice(index, 1)
        dispatch(
            setValuationObjectsCoordinates(valuationObjectsCoordinatesCopy)
        )
        // }
        // if (valuationObjectsParameters[index] !== {}) {
        const valuationObjectsParametersCopy = [...valuationObjectsParameters]
        valuationObjectsParametersCopy.splice(index, 1)
        dispatch(setValuationObjectsParameters(valuationObjectsParametersCopy))
        // }
        dispatch(setFinishedSteps(0))
        showToast(t('Valuation object deleted successfully'))
    }

    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h5">
                {t('Define valuation objects')}
            </Typography>
            <form className={classes.form}>
                {valuationObjects.map((object, index) => {
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
                                value={valuationObjects[index]}
                            />
                            <Avatar
                                className={classes.delete}
                                variant="rounded"
                                onClick={() => handleDeleteObject(index)}
                            >
                                <DeleteIcon />
                            </Avatar>
                        </div>
                    )
                })}
                <Button
                    onClick={handleAddTextField}
                    className={classes.newButton}
                    variant="outlined"
                    fullWidth
                >
                    <AddCircleIcon fontSize="small" color="secondary" />
                </Button>
            </form>
        </Paper>
    )
}

export default ValuationObjectsForm
