import React from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox'
import { addressToCoordinates } from '../../utils/functions'
import { useAppSelector } from '../../utils/hooks/useAppSelector'
import LatLng = google.maps.LatLng

const GoogleMapsSearch: React.FC = () => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 } as LatLng,
            radius: 100 * 1000,
        },
    })
    const mapRef = useAppSelector((state) => state.valuation.mapReference)

    const panTo = React.useCallback(({ lat, lng }) => {
        console.log(lat, lng)
        mapRef.panTo({ lat, lng })
        mapRef.setZoom(14)
    }, [])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSelect = async (address: string) => {
        setValue(address, false)
        clearSuggestions()
        try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            panTo({ lat, lng })
        } catch (error) {
            console.log('😱 Error: ', error)
        }
    }

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default GoogleMapsSearch
