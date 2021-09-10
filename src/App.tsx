import React from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import { LanguageSwitcher, Layout, ThemeSwitcher } from './components'

function App() {
    const { t } = useTranslation()
    return <Layout></Layout>
}

export default App
