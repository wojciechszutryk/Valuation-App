import React, { useState } from 'react'
import { ValuationObjects, ValuationParametersObjects } from 'typings'
import { Card, CardActions, CardContent, Typography, Slider } from '@material-ui/core';
import { useAppSelector } from 'utils/hooks/useAppSelector'

interface Props {
    valuationCriteria: ValuationParametersObjects
    title: string
}
const ValuationObjectCard = ({ valuationCriteria, title }: Props) => {
    const valuationParametersScale = useAppSelector(
        (state) => state.valuation.valuationParametersScale
    )
    const [criteriaValues, setCriteriaValues] = useState<number[]>(Array(valuationCriteria.length).fill(valuationParametersScale[1] - Math.floor((valuationParametersScale[1] - valuationParametersScale[0]) / 2)));

    const handleCriteriaChange = (criteria: number, value: number | number[]) => {
        if (typeof value === 'number') {
            const criteriaValuesCopy = [...criteriaValues];
            criteriaValuesCopy[criteria] = value;
            setCriteriaValues(criteriaValuesCopy)
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h2">
                    {title}
                </Typography>
                {valuationCriteria.map((criteria, index) => (
                    <>
                        <Typography gutterBottom>{criteria}</Typography>
                        <Slider
                            key={criteria}
                            aria-label="Valuation Criteria"
                            defaultValue={30}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            value={criteriaValues[index]}
                            min={valuationParametersScale[0]}
                            max={valuationParametersScale[1]}
                            onChange={(event, value) => handleCriteriaChange(index, value)}
                        />
                    </>
                ))}
            </CardContent>
        </Card>
    )
}

export default ValuationObjectCard;