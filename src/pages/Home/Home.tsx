import React, { useEffect } from 'react'
import { SadMac } from 'components'
import { useTranslation } from 'react-i18next';
import Aos from 'aos';
import "aos/dist/aos.css"
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'utils/hooks/useAppSelector';
import { getThemeByName } from 'utils/themes/getTheme';

interface Props { token: boolean, message: string }

const Home = ({ token = false, message = '' }: Props) => {

    const themeString = useAppSelector((state) => state.app.theme)
    const curThemeName = themeString || 'lightTheme'
    const theme = getThemeByName(curThemeName)
    useEffect(() => {
        Aos.init();
    }, [theme]);

    const classes = useStyles()
    const { t } = useTranslation();
    const delay = 200;
    const features = [
        t('creating account with own avatar'),
        t('changing user avatar'),
        t('adding and removing custom budget with categories'),
        t('switching languages at any time'),
        t('switching between budget at any time'),
        t('data visualization on interactive graphs'),
        t('adding and removing transactions'),
        t('sorting transaction with four available criteria'),
        t('searching in all transactions'),
        t('grouping transactions in categories'),
        t('exporting transactions to file'),
        t('importing transactions from file'),
        t('switching themes between light and dark'),
        t('website will look well at any device'),
        t('showing notification'),
    ];

    const featuresList = features.map((feature, index) => (
        <li
            key={index}
            data-aos="fade-left"
            data-aos-delay={(delay + index * 100).toString()}
            data-aos-duration={'300'}
            data-aos-once={true}
            className={clsx("aos-init", classes.featureLi)}
        >
            {feature}
        </li>
    ));

    return (
        <Grid data-aos="fade-right" className={classes.container} container spacing={3}>
            <Grid item data-aos="fade-right" md={6}>
                {
                    message &&
                    <Box className={classes.userInformation}>
                        {t(message)}
                    </Box>
                }
                {
                    !token ?
                        <Box className={classes.userButtons}>
                            <Link to='/login'>
                                <Button
                                    variant='outlined'
                                >{t('Login')}</Button>
                            </Link>
                            <Link to='/register'>
                                <Button
                                    variant='outlined'
                                >{t('Register')}</Button>
                            </Link>
                        </Box>
                        :
                        <Box className={classes.userInformation}>
                            {t('Logged in successfully, you can access Budget and Transaction Page')}
                        </Box>
                }
                <SadMac />
            </Grid>
            <Grid item md={6}>
                <Typography className={classes.styledHeader} data-aos="flip-down" data-aos-once={true}>{t("Budget App")}</Typography>
                <Typography className={classes.styledHeader} data-aos="flip-down" data-aos-once={true}>{t("Features")}:</Typography>
                <ul>
                    {featuresList}
                </ul>
            </Grid>
        </Grid>
    )
}

export default Home
