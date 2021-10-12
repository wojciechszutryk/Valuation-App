import { Box } from '@material-ui/core'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useStyles } from './styles'

const SadMac = ({ sad = false }) => {
    const classes = useStyles()
    useEffect(() => {
        let balls = document.querySelectorAll<HTMLElement>('.ball')
        document.onmousemove = function (event) {
            const x = (event.clientX * 100) / window.innerWidth + '%'
            const y = (event.clientY * 100) / window.innerHeight + '%'

            for (let i = 0; i < 2; i++) {
                balls[i].style.left = x
                balls[i].style.top = y
                balls[i].style.transform = 'translate(-' + x + ',-' + y + ')'
            }
        }
        return () => {
            document.onmousemove = () => {}
        }
    }, [])

    const children = (
        <Box className={classes.styledEyes}>
            <Box className={classes.styledEye}>
                <Box className={clsx(classes.styledBall, 'ball')} />
            </Box>
            <Box className={classes.styledEye}>
                <Box className={clsx(classes.styledBall, 'ball')} />
            </Box>
        </Box>
    )
    return sad ? (
        <Box className={classes.styledSadMac}>{children}</Box>
    ) : (
        <Box className={clsx(classes.styledSadMac, classes.styledHappyMac)}>
            {children}
        </Box>
    )
}

export default SadMac
