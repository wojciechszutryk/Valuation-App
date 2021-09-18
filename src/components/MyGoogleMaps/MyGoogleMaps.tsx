import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'
import { setMapReference, setValuationObjectsCoordinates } from '../../data/state/actions/valuationActions'
import { useAppDispatch } from '../../utils/hooks/useAppDispach'
import { useAppSelector } from '../../utils/hooks/useAppSelector'
import { darkMapTheme, lightMapTheme } from './styles'
import { ValuationObjects, ValuationObjectsCoordinates } from 'typings'

const mapContainerStyle = {
    width: '100%',
    height: '50vh',
}

const center = {
    lat: 50.0926,
    lng: 21.3689,
}

const darkThemeOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: darkMapTheme,
} as google.maps.MapOptions

const lightThemeOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: lightMapTheme,
} as google.maps.MapOptions

type MarkerState = {
    lat: number
    lng: number
    name: string
}

interface Props {
    valuationObjectsCoordinates: ValuationObjectsCoordinates
    valuationObjects: ValuationObjects
}

const MyGoogleMaps = ({
    valuationObjectsCoordinates,
    valuationObjects,
}: Props) => {
    useEffect(() => {
        const markerState = [] as MarkerState[]
        valuationObjectsCoordinates.forEach((coord, index) => {
            if (coord[0] && coord[1]) {
                const marker = {} as MarkerState
                marker.lat = coord[0]
                marker.lng = coord[1]
                marker.name = valuationObjects[index]
                markerState.push(marker)
            }
        })
        setMarkers(markerState)
    }, [valuationObjects, valuationObjectsCoordinates])
    const appTheme = useAppSelector((state) => state.app.theme)
    const [markers, setMarkers] = useState<MarkerState[]>([])
    const [selected, setSelected] = useState<MarkerState | null>(null)
    const activeObject = useAppSelector((state) => state.valuation.activeObject)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const onMapClick = useCallback((event) => {
        const valuationObjectsCoordinatesCopy = [...valuationObjectsCoordinates];
        valuationObjectsCoordinates.forEach((coord, index) => {
            if (index === activeObject) valuationObjectsCoordinatesCopy[index] = [event.latLng.lat(), event.latLng.lng()]
        })
        dispatch(setValuationObjectsCoordinates(valuationObjectsCoordinatesCopy))
    }, [])

    const mapRef = useRef()
    const onMapLoad = useCallback(
        (map) => {
            mapRef.current = map
            dispatch(setMapReference(map))
        },
        [mapRef, dispatch]
    )

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={
                    appTheme === 'lightTheme'
                        ? lightThemeOptions
                        : darkThemeOptions
                }
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker, index) => {
                    if (marker)
                        return (
                            <Marker
                                key={index}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={() => {
                                    setSelected(marker)
                                }}
                            />
                        )
                })}
                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null)
                        }}
                    >
                        <div>
                            <h2>{selected.name}</h2>
                            <p>{t('latitude') + ' :' + selected.lat + '°'}</p>
                            <p>{t('longitude') + ' :' + selected.lng + '°'}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )
}

export default MyGoogleMaps
