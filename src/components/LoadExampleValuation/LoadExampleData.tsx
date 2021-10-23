import { Button, Box } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'
import {
    setFinishedSteps,
    setParametersObjects,
    setParametersScale,
    setValuationObject,
    setValuationObjectArea,
    setValuationObjectParameters,
    setValuationObjects,
    setValuationObjectsAreas,
    setValuationObjectsParameters,
    setValuationObjectsPrices,
} from 'data/state/actions/valuationActions'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import { useHistory } from 'react-router-dom'
import { showToast } from 'utils'

const exampleValuationObject = {
    id: '1',
    name: 'ul. Zielona',
    objectParameters: {
        Lokalizacja: 3,
        'Sąsiedztwo i otoczenie': 2,
        'Kształt i wielokość działki': 4,
        Uzbrojenie: 2,
        Dojazd: 3,
    },
    area: 1725,
}

const exampleValuationObjects = {
    id: '1',
    names: [
        'ul.Szybowcowa',
        'ul.Podskarpie',
        'Mąkołowiec',
        'uk. Korfantego',
        'ul. Kłodnicka',
        'Zendek',
        'ul. Piaskowa',
        'ul. Oksywska',
        'Żory',
        'ul. Gombrowicza',
        'ul. Starowapienna',
        'Opatowice',
        'ul. Zawodze Dolne',
        'ul. Międzyświec',
        'ul. Wiślica',
    ],
    areas: [
        833, 1324, 1467, 1706, 1706, 1207, 1162, 1492, 1865, 1705, 1070, 1470,
        1963, 1577, 1645,
    ],
    prices: [
        99960, 399000, 320000, 209838, 1180000, 86904, 268000, 179000, 140000,
        203000, 93000, 150000, 228000, 110000, 99000,
    ],
    objectsParameters: [
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 1,
            'Kształt i wielokość działki': 2,
            Uzbrojenie: 3,
            Dojazd: 2,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 4,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 3,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 1,
            Dojazd: 3,
        },
        {
            Lokalizacja: 4,
            'Sąsiedztwo i otoczenie': 4,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 4,
            Dojazd: 4,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 1,
            'Kształt i wielokość działki': 3,
            Uzbrojenie: 2,
            Dojazd: 1,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 2,
            Dojazd: 3,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 3,
            Uzbrojenie: 2,
            Dojazd: 2,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 3,
            Uzbrojenie: 2,
            Dojazd: 3,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 3,
            Dojazd: 3,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 2,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 3,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 2,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 2,
            Dojazd: 1,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 1,
            'Kształt i wielokość działki': 2,
            Uzbrojenie: 2,
            Dojazd: 2,
        },
    ],
}

const LoadExampleData = () => {
    let history = useHistory()
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const handleLoadExampleData = React.useCallback(() => {
        const valuationObjectsParametersValues =
            exampleValuationObjects.objectsParameters
                .map((obj: { [key: string]: number }) => {
                    return Object.values(obj)
                })
                .flat()
                .concat(Object.values(exampleValuationObject.objectParameters))

        dispatch(setValuationObject(exampleValuationObject.name))
        dispatch(setValuationObjects(exampleValuationObjects.names))
        dispatch(setFinishedSteps(2))
        dispatch(
            setParametersObjects(
                Object.keys(exampleValuationObject.objectParameters)
            )
        )
        dispatch(
            setValuationObjectParameters(
                exampleValuationObject.objectParameters
            )
        )
        dispatch(
            setValuationObjectsParameters(
                exampleValuationObjects.objectsParameters
            )
        )
        dispatch(setValuationObjectsAreas(exampleValuationObjects.areas))
        dispatch(setValuationObjectsPrices(exampleValuationObjects.prices))
        dispatch(setValuationObjectArea(exampleValuationObject.area))
        dispatch(
            setParametersScale([
                Math.min(...valuationObjectsParametersValues),
                Math.max(...valuationObjectsParametersValues),
            ])
        )
        history.push('/valuation/new')
        showToast(t('Loaded example valuation successfully'))
    }, [dispatch, history, t])

    return (
        <Box className={classes.wrapper}>
            <Button
                variant={'outlined'}
                className={classes.loadButton}
                onClick={handleLoadExampleData}
            >
                {t('Load example work')}
            </Button>
        </Box>
    )
}

export default LoadExampleData
