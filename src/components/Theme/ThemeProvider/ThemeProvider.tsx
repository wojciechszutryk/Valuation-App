import React from 'react'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { getThemeByName } from 'utils/themes/getTheme'

const ThemeProvider: React.FC = (props) => {
    const themeString = useAppSelector((state) => state.app.theme)
    const curThemeName = themeString || 'lightTheme'

    const theme = getThemeByName(curThemeName)

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    )
}

export default ThemeProvider
