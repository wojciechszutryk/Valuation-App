import { getGeocode, getLatLng } from 'use-places-autocomplete'

export const addressToCoordinates = async (address: string) => {
    await getGeocode({ address })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
            return { lat, lng }
        })
        .catch((error) => {
            console.log('😱 Error: ', error)
        })
}
