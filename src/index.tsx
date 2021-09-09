import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import App from './App'
import { LanguageSwitcher } from 'components'
import store from './data/state/store'
import ThemeProvider from './utils'

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <LanguageSwitcher />
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
