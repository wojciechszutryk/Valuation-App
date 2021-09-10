import { createTheme } from '@material-ui/core'

export const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#7462a0',
            main: '#6a4b9b',
            dark: '#462564',
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
