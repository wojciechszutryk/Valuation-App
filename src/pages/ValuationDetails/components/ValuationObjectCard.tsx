import React, { useState } from 'react'
import { ValuationParametersObjects } from 'typings'
import {
    Card,
    CardContent,
    Typography,
    Slider,
    Box,
    makeStyles,
    createStyles,
} from '@material-ui/core'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import GoogleMapsSearch from 'components/MyGoogleMaps/GoogleMapsSearch'

const useStyles = makeStyles((theme) => {
    return createStyles({
        active: {
            boxShadow: `0px 0px 0px 3px ${theme.palette.primary.light} inset`,
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

    return (
        <Card className={active ? classes.active : undefined}>
            <CardContent>
                <Typography gutterBottom variant="h2">
                    {title}
                </Typography>
                <GoogleMapsSearch address={address} />
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
