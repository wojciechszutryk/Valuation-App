import { createTheme } from '@material-ui/core'

export const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#7462a0',
            main: '#6a4b9b',
            dark: '#462564',
        },
        secondary: {
            light: '#b092e7',
            main: '#7462a0',
            dark: '#685a9b',
        },
        divider: '#78007a',
        text: {
            primary: '#000000',
        },
        background: {
            default: '#dfe2ff',
            paper: '#f3f3ff',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '.Toastify__toast--info': {
                    background: '#6a4b9b',
                    color: '#fff',
                },
                '.Toastify__progress-bar--info': {
                    background: '#41006b',
                },
            },
        },
    },
})
