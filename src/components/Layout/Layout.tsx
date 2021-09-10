import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { Navigation } from 'components'

const useStyles = makeStyles((theme) => {
    return createStyles({
        layout: {
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
        },
    })
})

const Layout: React.FC = ({ children }) => {
    const classes = useStyles()
    return (
        <div className={classes.layout}>
            <Navigation />
            {children}
        </div>
    )
}

export default Layout
