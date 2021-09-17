import React, { useCallback, useRef, useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'
import { setMapReference } from '../../data/state/actions/valuationActions'
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
} | null

interface Props {
    valuationObjectsCoordinates: ValuationObjectsCoordinates
    valuationObjects: ValuationObjects
}

const MyGoogleMaps = ({
    valuationObjectsCoordinates,
    valuationObjects,
}: Props) => {
    const appTheme = useAppSelector((state) => state.app.theme)
    const [marker, setMarker] = useState<MarkerState>(null)
    const [selected, setSelected] = useState(false)
    const activeObject = useAppSelector((state) => state.valuation.activeObject)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const onMapClick = useCallback((event) => {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            name: valuationObjects[activeObject],
        })
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
                {marker ? (
                    <Marker
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected((current) => !current)
                        }}
                    />
                ) : null}
                {selected && marker ? (
                    <InfoWindow position={{ lat: marker.lat, lng: marker.lng }}>
                        <div>
                            <h2>{marker.name}</h2>
                            <p>{t('latitude') + ' :' + marker.lat + '°'}</p>
                            <p>{t('longitude') + ' :' + marker.lng + '°'}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )
}

export default MyGoogleMaps
