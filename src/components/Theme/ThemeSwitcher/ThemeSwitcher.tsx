import React from 'react'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import SetDarkButton from './SetDarkButton'
import SetLightButton from './SetLightButton'

const ThemeSwitcher: React.FC = () => {
    const theme = useAppSelector((state) => state.app.theme)
    return (
        <div>
            {theme === 'lightTheme' ? <SetDarkButton /> : <SetLightButton />}
        </div>
    )
}

export default ThemeSwitcher
