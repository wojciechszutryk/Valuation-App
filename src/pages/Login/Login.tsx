import React, { useEffect } from 'react'
import { SadMac } from 'components'
import { useTranslation } from 'react-i18next';
import Aos from 'aos';
import "aos/dist/aos.css"
import { Grid, Typography } from '@material-ui/core';
import { useAppSelector } from 'utils/hooks/useAppSelector';
import { getThemeByName } from 'utils/themes/getTheme';
import LoginForm from './components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '100vw !important',
            overflow: 'hidden',
            paddingTop: 20,
            '&>div': {
                width: '50%',
            },
            '@media (max-width: 600px)': {
                flexDirection: 'column',
                '&>div': {
                    width: '100%',
                },
            },
        },
        userInformation: {
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: 700,
            textAlign: 'center',
            color: theme.palette.type === 'light'
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            backgroundColor: theme.palette.background.paper,
            padding: 10,
            border: `3px solid ${theme.palette.divider}`,
        },
        header: {
            color: theme.palette.type === 'light'
                ? theme.palette.primary.dark
                : theme.palette.secondary.dark,
        }
    })
)


const Login = () => {
    const themeString = useAppSelector((state) => state.app.theme)
    const curThemeName = themeString || 'lightTheme'
    const theme = getThemeByName(curThemeName)
    useEffect(() => {
        Aos.init();
    }, [theme]);

    const classes = useStyles()
    const { t } = useTranslation();

    return (
        <Grid className={classes.container} container spacing={3}>
            <Grid item data-aos="fade-right" md={6}>
                <Typography variant='h3' align='center' className={classes.header}>{t('Login')}</Typography>
                <SadMac />
            </Grid>
            <Grid item md={6}>
                <LoginForm />
            </Grid>
        </Grid>
    )
}

export default Login