import { createStyles, Grid, makeStyles } from '@material-ui/core'
import React, { useCallback } from 'react'
import {
    Coordinates,
    ValuationObjects,
    ValuationObjectsCoordinates,
    ValuationParametersObjects,
} from 'typings'
import { setActiveObject } from 'data/state/actions/valuationActions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import ValuationObjectCard from './ValuationObjectCard'

const useStyles = makeStyles((theme) => {
    return createStyles({
        wrapper: {
            marginTop: theme.spacing(2),
        },
    })
})

interface Props {
    valuationObjects: ValuationObjects
    valuationObject: string
    valuationCriteria: ValuationParametersObjects
    valuationObjectsCoordinates: ValuationObjectsCoordinates
    valuationObjectCoordinates: Coordinates
}
const ValuationObjectsCardsWrapper = ({
    valuationObjects,
    valuationObject,
    valuationCriteria,
    valuationObjectsCoordinates,
    valuationObjectCoordinates,
}: Props) => {
    const classes = useStyles()
    const mapRef = useAppSelector((state) => state.valuation.mapReference)
    const activeObject = useAppSelector((state) => state.valuation.activeObject)
    const dispatch = useAppDispatch()

    const panTo = useCallback(
        ({ lat, lng }) => {
            mapRef.panTo({ lat, lng })
            mapRef.setZoom(17)
        },
        [mapRef]
    )

    const handleSelectObject = useCallback((index: number) => {
        dispatch(setActiveObject(index))
        if (valuationObjectsCoordinates[index][0] !== null)
            panTo(
                Object.fromEntries(
                    new Map([
                        ['lat', valuationObjectsCoordinates[index][0]],
                        ['lng', valuationObjectsCoordinates[index][1]],
                    ])
                )
            )
    }, [])

    return (
        <Grid container spacing={2} className={classes.wrapper}>
            {valuationObjects.map((obj, index) => (
                <Grid
                    item
                    key={obj}
                    xs={12}
                    sm={6}
                    lg={4}
                    onClick={() => handleSelectObject(index)}
                >
                    <ValuationObjectCard
                        title={obj}
                        valuationCriteria={valuationCriteria}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ValuationObjectsCardsWrapper