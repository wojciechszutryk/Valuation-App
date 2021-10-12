import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
            paddingTop: 20,
        },
        featureLi: {
            display: 'block',
            width: '100%',
            color: theme.palette.primary.main,
            textAlign: 'center',
            marginTop: 12,
            '&::before': {
                content: "\\2022",
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                display: 'inline-block',
                width: '1em',
                marginLeft: '-1em',
            }
        },

        userInformation: {
            width: '100%',
            fontWeight: 700,
            textAlign: 'center',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main,
            padding: 10,
            border: `3px solid ${theme.palette.secondary.main}`,
        },

        userButtons: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            '& a:first-child': {
                marginRight: '3px'
            }
        },

        styledHeader: {
            display: 'block',
            width: '100%',
            color: theme.palette.primary.main,
            textAlign: 'center',
        },
    })
)
