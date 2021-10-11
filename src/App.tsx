import React from 'react'
import './i18n'
import { toast, ToastContainer } from 'react-toastify'
import { Layout } from './components'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ValuationNew, ValuationFinish, ValuationDetails } from './pages'
import 'react-toastify/dist/ReactToastify.css'
import InfoIcon from '@material-ui/icons/Info'

function App() {
    toast.configure()
    return (
        <Layout>
            <Router>
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
            </Router>
            <ToastContainer icon={<InfoIcon color="primary" />} />
        </Layout>
    )
}

export default App
