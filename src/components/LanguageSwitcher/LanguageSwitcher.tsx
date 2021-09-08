import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
    const { i18n } = useTranslation()

    const changeLanguage = React.useCallback(
        (lng) => {
            i18n.changeLanguage(lng)
        },
        [i18n]
    )

    useEffect(() => {
        changeLanguage(navigator.language)
    }, [changeLanguage])

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>En</button>
            <button onClick={() => changeLanguage('de')}>De</button>
            <button onClick={() => changeLanguage('pl')}>Pl</button>
        </div>
    )
}

export default LanguageSwitcher
