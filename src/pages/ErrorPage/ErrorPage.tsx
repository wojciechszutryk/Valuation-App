import React from 'react'
import { SadMac } from 'components'
import { Button, Grid } from '@material-ui/core'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
            paddingTop: 20,
        },
    })
)

const ErrorPage = () => {
    const classes = useStyles()
    const { t } = useTranslation()

    const tryAgain = async () => {
        window.location.reload()
    }
    return (
        <Grid
            data-aos="fade-right"
            className={classes.container}
            container
            spacing={3}
        >
            <Grid item data-aos="fade-right" md={6}>
                <SadMac />
                <Button onClick={tryAgain}>{t('Try again')}</Button>
            </Grid>
        </Grid>
    )
}

export default ErrorPage
