import React from 'react'
import './i18n'
import { toast, ToastContainer } from 'react-toastify'
import { Layout } from './components'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ValuationNew, ValuationFinish, ValuationDetails, Home, Register, Login } from './pages'
import 'react-toastify/dist/ReactToastify.css'
import InfoIcon from '@material-ui/icons/Info';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
    toast.configure()
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Layout>
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
                        <Route
                            exact
                            path="/register"
                            component={Register}
                        />
                        <Route
                            exact
                            path="/login"
                            component={Login}
                        />
                        <Route
                            path="/"
                            component={Home}
                        />
                    </Switch>
                    <ToastContainer icon={<InfoIcon color="primary" />} />
                </Layout>
            </Router>
        </QueryClientProvider>
    )
}

export default App
