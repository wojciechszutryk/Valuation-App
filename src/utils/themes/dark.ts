import { createTheme } from '@material-ui/core'

export const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#d27d3c',
            main: '#9b501a',
            dark: '#6e3102',
        },
        text: {
            primary: '#ffffff',
        },
    },
})
