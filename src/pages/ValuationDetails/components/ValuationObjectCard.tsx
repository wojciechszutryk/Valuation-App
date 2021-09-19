import React, { useState } from 'react'
import { ValuationObjects, ValuationParametersObjects } from 'typings'
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Slider,
    Box,
} from '@material-ui/core'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import GoogleMapsSearch from '../../../components/MyGoogleMaps/GoogleMapsSearch'

interface Props {
    valuationCriteria: ValuationParametersObjects
    title: string
}
const ValuationObjectCard = ({ valuationCriteria, title }: Props) => {
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
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h2">
                    {title}
                </Typography>
                <GoogleMapsSearch />
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
