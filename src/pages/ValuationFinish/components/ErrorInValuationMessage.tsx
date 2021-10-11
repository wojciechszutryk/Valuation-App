import { Box, Typography, Button, Card, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useCallback } from 'react'
import { useHistory } from "react-router-dom"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { showToast } from 'utils'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            width: '100%',
        },
        text: {
            fontSize: '3rem',
            marginBottom: 10,
            color:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : theme.palette.secondary.main,
        },
        subText: {
            fontSize: '2rem',
            lineHeight: 1.167,
            marginBottom: 10,
            color:
                theme.palette.type === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.light,
        },
        errorParameter: {
            color:
                theme.palette.type === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.light,
            '& h6': {
                fontSize: '1.5rem',
                lineHeight: 1.5,
            },
            '&:last-child': {
                marginBottom: 10,
            }
        },
        item: {
            height: '100%',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        button: {
            color:
                theme.palette.type === 'dark'
                    ? 'white'
                    : theme.palette.secondary.main,
        }
    })
)


interface Props {
    valuationErrorInWeights: number[]
}

const ErrorInValuationMessage = ({ valuationErrorInWeights }: Props) => {
    const { t } = useTranslation()
    let history = useHistory();
    const classes = useStyles()
    const valuationObjectsParameters = useAppSelector(
        (state) => state.valuation.valuationObjectsParameters
    )
    const valuationObjectsAreas = useAppSelector(
        (state) => state.valuation.valuationObjectsAreas
    )
    const valuationObjectArea = useAppSelector(
        (state) => state.valuation.valuationObjectArea
    )
    const valuationParametersObjects = useAppSelector(
        (state) => state.valuation.valuationParametersObjects
    )
    const valuationObjectParameters = useAppSelector(
        (state) => state.valuation.valuationObjectParameters
    )
    const valuationObjects = useAppSelector(
        (state) => state.valuation.valuationObjects
    )
    const valuationObject = useAppSelector(
        (state) => state.valuation.valuationObject
    )

    useEffect(() => {
        showToast(t('Unfortunately valuation with currentyl set objects and criteria can not be done.'))
    }, [t])

    const downloadJSON = useCallback(() => {
        const valuationObj: {
            [key: string]: string | number | { [key: string]: number }
        } = {}
        const valuationObjs: {
            [key: string]: string[] | number[] | { [key: string]: number }[]
        } = {}
        const downloadObj: {
            [key: string]:
            | {
                [key: string]: string | number | { [key: string]: number }
            }
            | {
                [key: string]:
                | string[]
                | number[]
                | { [key: string]: number }[]
            }
        } = {}
        valuationObj['name'] = valuationObject
        valuationObj['area'] = valuationObjectArea
        valuationObj['area'] = valuationObjectArea
        valuationObj['objectParameters'] = valuationObjectParameters
        valuationObjs['names'] = valuationObjects
        valuationObjs['areas'] = valuationObjectsAreas
        valuationObjs['objectsParameters'] = valuationObjectsParameters
        downloadObj['valuationObject'] = valuationObj
        downloadObj['valuationObjects'] = valuationObjs
        const url = window.URL.createObjectURL(
            new Blob([JSON.stringify(downloadObj)])
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
            'download',
            `[${t('UNFINISHED')}]-${valuationObject}-${new Date().toLocaleDateString()}.json`
        )
        document.body.appendChild(link)
        link.click()
        link.parentNode && link.parentNode.removeChild(link)
        showToast(t('succeeded in exporting report to .json file'))
    }, [
        valuationObjectArea,
        valuationObjectParameters,
        valuationObjects,
        valuationObjectsAreas,
        valuationObjectsParameters,
        t,
        valuationObject,
    ])

    return (
        <Box className={classes.box}>
            <Typography className={classes.text} variant='h1'>{t('Unfortunately valuation with currentyl set objects and criteria can not be done.')}</Typography>
            <Typography className={classes.subText} variant='subtitle1'>{t('Algoritm is not able to find pairs of objects to the following criteria') + ':'}</
            Typography>
            <ul>
                {valuationErrorInWeights.map(index => (
                    <li key={index} className={classes.errorParameter}>
                        <Typography variant='subtitle1'>
                            - {valuationParametersObjects[index]}
                        </Typography>
                    </li>
                ))}
            </ul>
            <Typography className={classes.text} variant='h2'>{t('What s next?')}</
            Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.item}>
                        <Typography className={classes.subText} variant='subtitle1'>{t('Try to add new objects to valuation') + ':'}</
                        Typography>
                        <Button variant="outlined"
                            fullWidth
                            className={classes.button}
                            onClick={() => history.push('/valuation/new')}>{t('New objects')}</Button>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.item}>
                        <Typography className={classes.subText} variant='subtitle1'>{t('...or change existing s objects parameters') + ':'}</
                        Typography>
                        <Button variant="outlined"
                            fullWidth
                            className={classes.button}
                            onClick={() => history.push('/valuation/details')}>{t('Change parameters')}</Button>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.item}>
                        <Typography className={classes.subText} variant='subtitle1'>{t('...or save work and come back to it later') + ':'}</
                        Typography>
                        <Button variant="outlined"
                            fullWidth
                            className={classes.button}
                            onClick={downloadJSON}>{t('Save to JSON')}</Button>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ErrorInValuationMessage
