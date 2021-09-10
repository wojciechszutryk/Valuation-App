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
        },
    },
})
