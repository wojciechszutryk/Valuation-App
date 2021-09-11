import { createTheme } from '@material-ui/core'

export const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#9b9b9b',
            main: '#7e7e7e',
            dark: '#3e3e3e',
        },
        secondary: {
            light: '#d66d6d',
            main: '#3e3e3e',
            dark: '#a70404',
        },
        divider: '#a70404',
        text: {
            primary: '#ffffff',
        },
        background: {
            default: '#414141',
            paper: '#4e4e4e',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '.Toastify__toast--info': {
                    background: '#9b9b9b',
                    color: '#fff',
                },
                '.Toastify__progress-bar--info': {
                    background: '#a70404',
                },
            },
        },
    },
})
