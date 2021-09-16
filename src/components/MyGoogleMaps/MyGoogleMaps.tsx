import React, { useCallback, useRef, useState } from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'
import { ClockLoader } from 'react-spinners'
import { setLanguage } from '../../data/state/actions'
import { setMapReference } from '../../data/state/actions/valuationActions'
import { useAppDispatch } from '../../utils/hooks/useAppDispach'
import { useAppSelector } from '../../utils/hooks/useAppSelector'
import { darkMapTheme, lightMapTheme } from './styles'

const libraries = ['places'] as (
    | 'places'
    | 'drawing'
    | 'geometry'
    | 'localContext'
    | 'visualization'
)[]

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
} | null

const MyGoogleMaps = ({ name }: { name: string }) => {
    const appTheme = useAppSelector((state) => state.app.theme)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
        libraries,
    })
    const [marker, setMarker] = useState<MarkerState>(null)
    const [selected, setSelected] = useState(false)
    const dispatch = useAppDispatch()

    const onMapClick = useCallback((event) => {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    }, [])

    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
        dispatch(setMapReference(map))
    }, [])

    if (loadError) return <div>'Error Loading map'</div>
    if (!isLoaded) return <ClockLoader size={150} />

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
                    <InfoWindow
                        position={{ lat: marker.lat, lng: marker.lng }}
                        // onCloseClick={() => {
                        //     setSelected((current) => !current)
                        // }}
                    >
                        <div>
                            <h2>{name}</h2>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )
}

export default MyGoogleMaps
