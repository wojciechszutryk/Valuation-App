import { faCloud, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { setTheme } from '../../../data/state/actions'
import { useAppDispatch } from '../../../utils/hooks/useAppDispach'

const useStyles = makeStyles({
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: '#8f3c41',
        minWidth: 0,
        display: 'inline-block',
        position: 'relative',
        width: '34px',
        height: '34px',
        marginRight: '3px',
        border: '2px solid $000',
        cursor: 'pointer',
        overflow: 'hidden',
        '& svg:first-child': {
            position: 'absolute',
            top: '40%',
            left: '-20px',
            transition: 'left .1s',
            zIndex: 1,
        },
        '& svg:nth-child(2)': {
            position: 'absolute',
            left: '7px',
            top: '6px',
            transition: 'left .1s, transform .2s',
            fontSize: '20px',
        },
        '&:hover': {
            backgroundColor: 'rgb(171, 212, 245)',
        },
        '&:hover svg:first-child': {
            color: 'white',
            left: '2px',
        },
        '&:hover svg:nth-child(2)': {
            color: 'rgb(247, 244, 143)',
            left: '9px',
            transformOrigin: 'center',
            transform: 'rotate(60deg)',
            fontSize: '20px',
        },
    },
})

const SetLightButton: React.FC = () => {
    const dispatch = useAppDispatch()
    const classes = useStyles()
    return (
        <Button
            className={classes.button}
            onClick={() => dispatch(setTheme('lightTheme'))}
        >
            <FontAwesomeIcon icon={faCloud} />
            <FontAwesomeIcon icon={faSun} />
        </Button>
    )
}

export default SetLightButton
