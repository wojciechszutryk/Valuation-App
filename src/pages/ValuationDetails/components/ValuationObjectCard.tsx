import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ValuationParametersObjects } from 'typings'
import {
    Card,
    CardContent,
    Typography,
    Slider,
    Box,
    makeStyles,
    createStyles,
    TextField,
    InputAdornment,
} from '@material-ui/core'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import GoogleMapsSearch from 'components/MyGoogleMaps/GoogleMapsSearch'
import {
    setValuationObjectArea,
    setValuationObjectPrice,
} from 'data/state/actions/valuationActions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import EuroIcon from '@material-ui/icons/Euro'
import AspectRatioIcon from '@material-ui/icons/AspectRatio'

const useStyles = makeStyles((theme) => {
    return createStyles({
        card: {
            backgroundColor: theme.palette.primary.main,
        },
    })
})

interface Props {
    valuationCriteria: ValuationParametersObjects
    title: string
    address: string
}
const ValuationObjectCard = ({ valuationCriteria, title, address }: Props) => {
    const classes = useStyles()
    const valuationParametersScale = useAppSelector(
        (state) => state.valuation.valuationParametersScale
    )
    const valuationObjectArea = useAppSelector(
        (state) => state.valuation.valuationObjectArea
    )
    const valuationObjectPrice = useAppSelector(
        (state) => state.valuation.valuationObjectPrice
    )
    const [criteriaValues, setCriteriaValues] = useState<number[]>(
        Array(valuationCriteria.length).fill(
            valuationParametersScale[1] -
                Math.floor(
                    (valuationParametersScale[1] -
                        valuationParametersScale[0]) /
                        2
                )
        )
    )
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const handleCriteriaChange = (
        criteria: number,
        value: number | number[]
    ) => {
        if (typeof value === 'number') {
            const criteriaValuesCopy = [...criteriaValues]
            criteriaValuesCopy[criteria] = value
            setCriteriaValues(criteriaValuesCopy)
        }
    }

    function handlePriceChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        dispatch(setValuationObjectPrice(parseInt(e.target.value)))
    }

    function handleAreaChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        dispatch(setValuationObjectArea(parseInt(e.target.value)))
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h2">
                    {title}
                </Typography>
                <GoogleMapsSearch address={address} />
                <TextField
                    label={t('area')}
                    fullWidth
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <AspectRatioIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={isNaN(valuationObjectArea) ? 0 : valuationObjectArea}
                    onChange={(e) => handleAreaChange(e)}
                />
                <TextField
                    label={t('price')}
                    fullWidth
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <EuroIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={
                        isNaN(valuationObjectPrice) ? 0 : valuationObjectPrice
                    }
                    onChange={(e) => handlePriceChange(e)}
                />
                {valuationCriteria.map((criteria, index) => (
                    <Box key={criteria}>
                        <Typography gutterBottom>{criteria}</Typography>
                        <Slider
                            aria-label="Valuation Criteria"
                            defaultValue={30}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            value={criteriaValues[index]}
                            min={valuationParametersScale[0]}
                            max={valuationParametersScale[1]}
                            onChange={(event, value) =>
                                handleCriteriaChange(index, value)
                            }
                        />
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}

export default ValuationObjectCard
