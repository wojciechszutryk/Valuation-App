import { createTheme } from '@material-ui/core'

export const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#9b9b9b',
            main: '#7e7e7e',
            dark: '#3e3e3e',
        },
        divider: '#a70404',
        text: {
            primary: '#ffffff',
        },
        background: {
            default: '#414141',
        },
    },
})
