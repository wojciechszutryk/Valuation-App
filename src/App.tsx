import { Button, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import { Provider } from 'react-redux'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './components/LanguageSwitcher'
import './i18n'
import store from './data/state/store'
import ThemeProvider from './utils'
import { ThemeContext } from './utils'

const useStyles = makeStyles((theme) => {
    return {
        page: {
            backgroundColor: 'primary',
        },
    }
})

function App() {
    const { t } = useTranslation()
    const setThemeName = useContext(ThemeContext)
    const classes = useStyles()

    console.log(localStorage.getItem('appTheme'))
    return (
        <Provider store={store}>
            <ThemeProvider>
                <LanguageSwitcher />
                <div className="App">
                    <Button
                        className={classes.page}
                        variant="contained"
                        color="primary"
                        onClick={() => setThemeName('lightTheme')}
                    >
                        Set Light Theme
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setThemeName('darkTheme')}
                    >
                        Set Dark Theme
                    </Button>
                </div>
            </ThemeProvider>
        </Provider>
    )
}

export default App
