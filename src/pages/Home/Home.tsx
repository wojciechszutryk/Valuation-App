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
import { FileUpload } from 'components'

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
        t('signing up and logging in'),
        t('adding and removing valuation objects'),
        t('adding and removing valuation criterias'),
        t('setting criteria range on slider'),
        t('switching languages at any time'),
        t('switching theme between dark and white at any time'),
        t('setting objects parameters'),
        t('showing objects on customized map'),
        t('adding objects coordinates by clicking on map'),
        t('panning to object location on map when selecting'),
        t('automatic sellecting suggested objects for valuation'),
        t('moving valuation form forward and backward and not loosing data'),
        t('showing valuation report'),
        t('exporting raport to pdf, excel or JSON file'),
        t('saving work on account after logging in'),
        t('loading work from acconts work history'),
        t('website will look well at any device'),
        t('importing JSON file to the application'),
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
                            <Link to='/valuation/new' className={classes.newValuation}>
                                <Button
                                    variant='outlined'
                                >{t('Start Valuation')}</Button>
                            </Link>
                            <FileUpload />
                            <Link to='/login' className={classes.pageLink}>
                                <Button
                                    variant='outlined'
                                >{t('Login')}</Button>
                            </Link>
                            <Link to='/register' className={classes.pageLink}>
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
                <Typography className={classes.styledHeader} variant='h3' data-aos="flip-down" data-aos-once={true}>{t("Valuation App")}</Typography>
                <Typography className={clsx(classes.styledHeader, classes.subHeader)} variant='h4' data-aos="flip-down" data-aos-once={true}>{t("Features")}:</Typography>
                <ul>
                    {featuresList}
                </ul>
            </Grid>
        </Grid>
    )
}

export default Home
