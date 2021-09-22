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
                '::-webkit-scrollbar-track': {
                    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
                    backgroundColor: '#f3f3ff',
                },

                '::-webkit-scrollbar': {
                    width: window.innerWidth < 600 ? '1px' : '6px',
                    backgroundColor: '#6a4b9b',
                    transition: 'background-color .1s',
                },

                '::-webkit-scrollbar-thumb': {
                    backgroundColor: '#b092e7',
                },
                '::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#9377c1',
                },
            },
        },
    },
})
