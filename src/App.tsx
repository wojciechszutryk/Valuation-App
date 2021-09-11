import React from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import { toast, ToastContainer } from 'react-toastify'
import { Layout } from './components'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { ValuationNew, ValuationFinish, ValuationDetails } from './pages'
import { showToast } from './utils'
import 'react-toastify/dist/ReactToastify.css'
import InfoIcon from '@material-ui/icons/Info'

function App() {
    const { t } = useTranslation()
    toast.configure()
    return (
        <Layout>
            <Router>
                <div>
                    <nav>
                        <Link
                            to="/valuation/new"
                            onClick={() => showToast('some text')}
                        >
                            Home
                        </Link>
                        <Link to="/valuation/finish">Foo</Link>
                        <Link to="/valuation/details">Bar</Link>
                    </nav>
                    <Switch>
                        <Route
                            exact
                            path="/valuation/new"
                            component={ValuationNew}
                        />
                        <Route
                            exact
                            path="/valuation/finish"
                            component={ValuationFinish}
                        />
                        <Route
                            exact
                            path="/valuation/details"
                            component={ValuationDetails}
                        />
                    </Switch>
                </div>
            </Router>
            <ToastContainer icon={<InfoIcon />} />
        </Layout>
    )
}

export default App
