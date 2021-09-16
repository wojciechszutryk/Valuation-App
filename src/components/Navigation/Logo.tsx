import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => {
    return {
        ws: {
            color:
                theme.palette.type === 'light'
                    ? '#41006b'
                    : theme.palette.divider,
            fontSize: 27,
            fontWeight: 'bold',
            fontFamily: 'Parisienne',
            marginRight: '5px',
        },
        valuation: {
            color: theme.palette.type === 'light' ? '#e0e0e0' : '#b0b0b0',
            fontSize: 21,
            fontWeight: 'bold',
            fontFamily: 'Cinzel',
        },
        wsInDrawer: {
            color: theme.palette.divider,
            fontSize: 27,
            fontWeight: 'bold',
            fontFamily: 'Parisienne',
            marginRight: '5px',
        },
        valuationInDrawer: {
            color: theme.palette.type === 'light' ? 'black' : '#b0b0b0',
            fontSize: 21,
            fontWeight: 'bold',
            fontFamily: 'Cinzel',
        },
    }
})

const Logo: React.FC<{ inDrawer: boolean }> = ({ inDrawer = false }) => {
    const classes = useStyles(inDrawer)
    return (
        <Button>
            <span className={inDrawer ? classes.wsInDrawer : classes.ws}>
                WS
            </span>
            <span
                className={
                    inDrawer ? classes.valuationInDrawer : classes.valuation
                }
            >
                VALUATION
            </span>
        </Button>
    )
}

export default Logo
