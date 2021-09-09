import React from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import { ThemeSwitcher } from './components'

function App() {
    const { t } = useTranslation()
    return (
        <div className="App">
            <ThemeSwitcher />
        </div>
    )
}

export default App
