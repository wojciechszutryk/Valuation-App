import React, { useState } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { getThemeByName } from '../getTheme'

export const ThemeContext = React.createContext((themeName: string): void => {
    localStorage.setItem('appTheme', themeName)
})

const ThemeProvider: React.FC = (props) => {
    const curThemeName = localStorage.getItem('appTheme') || 'lightTheme'
    const [themeName, _setThemeName] = useState(curThemeName)

    const setThemeName = (themeName: string): void => {
        _setThemeName(themeName)
    }

    const theme = getThemeByName(themeName)

    return (
        <ThemeContext.Provider value={setThemeName}>
            <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
