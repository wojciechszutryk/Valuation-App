import React, { useEffect, useMemo, useState } from 'react'
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
import GoogleMapsSearch from 'pages/ValuationDetails/components/MyGoogleMaps/GoogleMapsSearch'
import {
    setValuationObjectsAreas,
    setValuationObjectsParameters,
    setValuationObjectsPrices,
} from 'data/state/actions/valuationActions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import EuroIcon from '@material-ui/icons/Euro'
import AspectRatioIcon from '@material-ui/icons/AspectRatio'

const useStyles = makeStyles((theme) => {
    return createStyles({
        active: {
            boxShadow: `0px 0px 0px 3px ${theme.palette.primary.light} inset`,
        },
        header: {
            fontSize: 40,
            textAlign: 'center',
        },
    })
})

interface Props {
    valuationCriteria: ValuationParametersObjects
    title: string
    address: string
    active: boolean
    index: number
}
const ValuationObjectsCard = ({
    valuationCriteria,
    title,
    address,
    active,
    index,
}: Props) => {
    const classes = useStyles()
    const valuationParametersScale = useAppSelector(
        (state) => state.valuation.valuationParametersScale
    )
    const valuationObjectsAreas = useAppSelector(
        (state) => state.valuation.valuationObjectsAreas
    )
    const valuationObjectsPrices = useAppSelector(
        (state) => state.valuation.valuationObjectsPrices
    )
    const valuationObjectsParameters = useAppSelector(
        (state) => state.valuation.valuationObjectsParameters
    )

    let initialState = []
    try {
        initialState =
            Object.keys(valuationObjectsParameters[0])[0] === ''
                ? Array(valuationCriteria.length).fill(
                      valuationParametersScale[1] -
                          Math.floor(
                              (valuationParametersScale[1] -
                                  valuationParametersScale[0]) /
                                  2
                          )
                  )
                : Object.values(valuationObjectsParameters[index])
    } catch (e) {
        initialState = Array(valuationCriteria.length).fill(
            valuationParametersScale[1] -
                Math.floor(
                    (valuationParametersScale[1] -
                        valuationParametersScale[0]) /
                        2
                )
        )
    }

    const [criteriaValues, setCriteriaValues] = useState<number[]>(initialState)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    useMemo(() => {
        const objectParameters: { [key: string]: number } = {}
        valuationCriteria.forEach((criteria, index) => {
            objectParameters[criteria] = criteriaValues[index]
        })
        const valuationObjectsParametersCopy = [...valuationObjectsParameters]
        valuationObjectsParametersCopy[index] = objectParameters
        dispatch(setValuationObjectsParameters(valuationObjectsParametersCopy))
    }, [criteriaValues, valuationCriteria, dispatch, index])

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
        const valuationObjectsPricesCopy = [...valuationObjectsPrices]
        valuationObjectsPricesCopy[index] = parseInt(e.target.value)
        dispatch(setValuationObjectsPrices(valuationObjectsPricesCopy))
    }

    function handleAreaChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        const valuationObjectsAreasCopy = [...valuationObjectsAreas]
        valuationObjectsAreasCopy[index] = parseInt(e.target.value)
        dispatch(setValuationObjectsAreas(valuationObjectsAreasCopy))
    }

    return (
        <Card className={active ? classes.active : undefined}>
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h2"
                    className={classes.header}
                >
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
                    value={
                        isNaN(valuationObjectsAreas[index])
                            ? 0
                            : valuationObjectsAreas[index]
                    }
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
                        isNaN(valuationObjectsPrices[index])
                            ? 0
                            : valuationObjectsPrices[index]
                    }
                    onChange={(e) => handlePriceChange(e)}
                />
                {valuationCriteria.map((criteria, criteriaIndex) => (
                    <Box key={criteria}>
                        <Typography gutterBottom>{criteria}</Typography>
                        <Slider
                            color="secondary"
                            aria-label="Valuation Criteria"
                            defaultValue={30}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            value={criteriaValues[criteriaIndex]}
                            min={valuationParametersScale[0]}
                            max={valuationParametersScale[1]}
                            onChange={(event, value) =>
                                handleCriteriaChange(criteriaIndex, value)
                            }
                        />
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}

export default ValuationObjectsCard
