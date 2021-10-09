import { Box, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useAppSelector } from 'utils/hooks/useAppSelector'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            width: '100%',
            backgroundColor:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : '#e6e6ff',
        },
        text: {
            color:
                theme.palette.type === 'dark' ? '#777777' : '#d5d5fc',
        },
        listItem: {
            color:
                theme.palette.type === 'dark' ? '#777777' : '#d5d5fc',
        }
    })
)


interface Props {
    valuationErrorInWeights: number[]
}

const ErrorInValuationMessage = ({ valuationErrorInWeights }: Props) => {
    const valuationParametersObjects = useAppSelector(
        (state) => state.valuation.valuationParametersObjects
    )
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <Box className={classes.box}>
            <Typography className={classes.text} variant='h1'>{t('Unfortunately valuation with currentyl set objects and criteria can not be done.')}</Typography>
            <Typography className={classes.text} variant='subtitle1'>{t('Algoritm is not able to find pairs of objects to the following criteria')}</
            Typography>
            <ul>
                {valuationErrorInWeights.map(index => (
                    <li key={index}>
                        <Typography variant='subtitle1'>
                            {valuationParametersObjects[index]}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Box>
    )
}

export default ErrorInValuationMessage
