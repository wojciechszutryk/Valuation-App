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
            dark: '#943a3a',
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
                '::-webkit-scrollbar-track': {
                    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
                    backgroundColor: '#9b9b9b',
                },

                '::-webkit-scrollbar': {
                    width: window.innerWidth < 600 ? '1px' : '6px',
                    backgroundColor: '#a70404',
                    transition: 'background-color .1s',
                },

                '::-webkit-scrollbar-thumb': {
                    backgroundColor: '#a70404',
                },
                '::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#e74141',
                },
            },
        },
        MuiCheckbox: {
            colorSecondary: {
                color: '#3e3e3e',
                '&$checked': {
                    color: '#943a3a',
                },
            },
        },
        MuiSvgIcon: {
            colorSecondary: {
                color: '#e74141',
            },
        },
        MuiSlider: {
            colorPrimary: {
                color: '#bebebe',
            },
            colorSecondary: {
                color: '#e74141',
            },
        },
    },
})
