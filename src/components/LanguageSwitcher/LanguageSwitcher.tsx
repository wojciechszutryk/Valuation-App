import {
    createStyles,
    FormControl,
    InputLabel,
    makeStyles,
    Select,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../../data/state/actions'
import { useAppDispatch } from '../../utils/hooks/useAppDispach'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

const useStyles = makeStyles((theme) => {
    console.log(theme)
    return createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        select: {
            '& select': {
                paddingTop: '12px',
                paddingBottom: '12px',
            },
        },
        option: {
            backgroundColor: theme.palette.primary.light + '!important',
            color: '#fff',
        },
    })
})

const LanguageSwitcher = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const { i18n } = useTranslation()
    const { t } = useTranslation()
    const language = useAppSelector((state) => state.app.language.slice(0, 2))

    const changeLanguage = React.useCallback(
        (lng) => {
            i18n.changeLanguage(lng)
            dispatch(setLanguage(lng))
        },
        [i18n]
    )

    useEffect(() => {
        changeLanguage(navigator.language)
    }, [changeLanguage])

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
                {t('language')}
            </InputLabel>
            <Select
                className={classes.select}
                native
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                label={t('language')}
                inputProps={{
                    name: 'language',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option className={classes.option} value={'en'}>
                    {t('English')}
                </option>
                <option className={classes.option} value={'de'}>
                    {t('German')}
                </option>
                <option className={classes.option} value={'pl'}>
                    {t('Polish')}
                </option>
            </Select>
        </FormControl>
    )
}

export default LanguageSwitcher
