import React, { useMemo, useState } from 'react'
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
    setValuationObjectArea,
    setValuationObjectParameters,
} from 'data/state/actions/valuationActions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import AspectRatioIcon from '@material-ui/icons/AspectRatio'

const useStyles = makeStyles((theme) => {
    return createStyles({
        card: {
            backgroundColor: theme.palette.background.paper,
        },
        active: {
            boxShadow: `0px 0px 0px 3px ${theme.palette.primary.light} inset`,
        },
        header: {
            color: theme.palette.primary.light,
            fontWeight: 'bold',
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
}
const ValuationObjectCard = ({
    valuationCriteria,
    title,
    address,
    active,
}: Props) => {
    const classes = useStyles()
    const valuationParametersScale = useAppSelector(
        (state) => state.valuation.valuationParametersScale
    )
    const valuationObjectArea = useAppSelector(
        (state) => state.valuation.valuationObjectArea
    )
    const valuationObjectParameters = useAppSelector(
        (state) => state.valuation.valuationObjectParameters
    )
    let initialState = []
    try {
        initialState =
            Object.keys(valuationObjectParameters)[0] === ''
                ? Array(valuationCriteria.length).fill(
                      valuationParametersScale[1] -
                          Math.floor(
                              (valuationParametersScale[1] -
                                  valuationParametersScale[0]) /
                                  2
                          )
                  )
                : Object.values(valuationObjectParameters)
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
        dispatch(setValuationObjectParameters(objectParameters))
    }, [criteriaValues, valuationCriteria, dispatch])
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

    function handleAreaChange(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        dispatch(setValuationObjectArea(parseInt(e.target.value)))
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
                    color="secondary"
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
