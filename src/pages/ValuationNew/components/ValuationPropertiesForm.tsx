import {
    Avatar,
    Box,
    Button,
    Paper,
    Slider,
    TextField,
    Typography,
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { findDuplicatesInArray, showToast } from 'utils'
import DeleteIcon from '@material-ui/icons/Delete'
import { setValuationObjectsParameters } from '../../../data/state/actions/valuationActions'
import { useAppDispatch } from '../../../utils/hooks/useAppDispach'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useStyles } from './styles'

type Props = {
    valuationCriteria: string[]
    valueCriteriaScale: number[]
    setValuationCriteria: (valuationCriteria: string[]) => void
    setValueCriteriaScale: (valueCriteriaScale: number[]) => void
}

const ValuationPropertiesForm = ({
    valuationCriteria,
    setValuationCriteria,
    valueCriteriaScale,
    setValueCriteriaScale,
}: Props) => {
    const valuationObjectsParameters = useAppSelector(
        (state) => state.valuation.valuationObjectsParameters
    )
    const dispatch = useAppDispatch()
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

    function handleSliderChange(e: any, newValue: number | number[]) {
        if (
            newValue instanceof Array &&
            Math.abs(newValue[0] - newValue[1]) <= 0
        )
            return
        setValueCriteriaScale(newValue as number[])
    }

    function handleDeleteObject(index: number) {
        const valuationObjectsCopy = [...valuationCriteria]
        valuationObjectsCopy.splice(index, 1)
        setValuationCriteria(valuationObjectsCopy)
        const valuationObjectsParametersCopy = JSON.parse(
            JSON.stringify(valuationObjectsParameters)
        )
        const parameterName = Object.keys(valuationObjectsParametersCopy[0])[0]
        valuationObjectsParametersCopy.forEach(
            (object: { [key: string]: number }) => {
                delete object[parameterName]
            }
        )
        dispatch(setValuationObjectsParameters(valuationObjectsParametersCopy))
        showToast(t('Valuation property deleted successfully'))
    }

    return (
        <Paper className={classes.paperProp} elevation={0}>
            <Typography className={classes.header} variant="h5">
                {t('Define valuation criteria')}
            </Typography>
            <Box className={classes.sliderDescriptionWrapper}>
                <Typography className={classes.sliderDescription} variant="h6">
                    {t('Creiteria scale') + ': ' + t('from') + ' '}
                    <span className={classes.sliderValues}>
                        {valueCriteriaScale[0]}
                    </span>
                    {' ' + t('to') + ' '}
                    <span className={classes.sliderValues}>
                        {valueCriteriaScale[1]}
                    </span>
                </Typography>
                <Slider
                    color="secondary"
                    value={valueCriteriaScale}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={20}
                    marks
                    step={1}
                    aria-labelledby="range-slider"
                    getAriaValueText={(value) => value.toString()}
                />
            </Box>
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

export default ValuationPropertiesForm
