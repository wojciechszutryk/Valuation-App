import { getGeocode, getLatLng } from 'use-places-autocomplete'
import type { Coordinates } from 'typings'

type AddressToCoordinates = (address: string) => any

export const addressToCoordinates: AddressToCoordinates = async (address) => {
    return await getGeocode({ address })
        .then((results) => {
            console.log(results)
            return getLatLng(results[0])
        })
        .then(({ lat, lng }) => {
            return [lat, lng] as Coordinates
        })
        .catch((error) => {
            return [null, null] as Coordinates
        })
}
