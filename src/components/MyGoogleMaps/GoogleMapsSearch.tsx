import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
import { useAppSelector } from '../../utils/hooks/useAppSelector'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form__field: {
            font: 'inherit',
            fontWeight: 'normal',
            fontFamily: 'Roboto',
            fontSize: '16px',
            width: '100%',
            height: 40,
            border:
                theme.palette.type === 'dark'
                    ? `1px solid ${theme.palette.grey[600]}`
                    : `1px solid ${theme.palette.grey[500]}`,
            outline: '0',
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
            borderRadius: 4,
            padding: '7.5px 14px',
            '&::placeholder': {
                color:
                    theme.palette.type === 'dark'
                        ? theme.palette.grey[500]
                        : theme.palette.grey[600],
            },
            '&:hover': {
                border:
                    theme.palette.type === 'dark'
                        ? `1px solid ${theme.palette.grey[100]}`
                        : `1px solid ${theme.palette.grey[900]}`,
            },
            '&:focus': {
                border:
                    theme.palette.type === 'dark'
                        ? `2px solid ${theme.palette.grey[600]}`
                        : `2px solid ${theme.palette.primary.light}`,
                padding: '6.5px 13px',
            },
        },
        form__li: {
            cursor: 'pointer',
            transition: '.2s',
            '&:hover': {
                backgroundColor: theme.palette.background.paper,
            },
        },
    })
)

const GoogleMapsSearch: React.FC = () => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {},
    })
    const mapRef = useAppSelector((state) => state.valuation.mapReference)
    const classes = useStyles()
    const { t } = useTranslation()

    const panTo = React.useCallback(
        ({ lat, lng }) => {
            mapRef.panTo({ lat, lng })
            mapRef.setZoom(17)
        },
        [mapRef]
    )

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
                    placeholder={t('city, address')}
                    id="name"
                    className={classes.form__field}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' &&
                            data.map(({ id, description }, index) => (
                                <ComboboxOption
                                    className={clsx(
                                        classes.form__field,
                                        classes.form__li
                                    )}
                                    key={index}
                                    value={description}
                                />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default GoogleMapsSearch
