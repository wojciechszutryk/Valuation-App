import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

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
        featureLi: {
            display: 'block',
            width: '100%',
            color: theme.palette.primary.main,
            textAlign: 'center',
            marginTop: 12,
            fontSize: 16,
            '&::before': {
                content: "'\\2022'",
                color: theme.palette.divider,
                fontWeight: 'bold',
                display: 'inline-block',
                width: '1em',
                marginLeft: '-1em',
            },
        },

        userInformation: {
            width: '100%',
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: 700,
            textAlign: 'center',
            // whiteSpace: 'nowrap',
            color:
                theme.palette.type === 'light'
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
            backgroundColor: theme.palette.background.paper,
            padding: 10,
            borderRadius: 30,
            '&::after': {
                content: "''",
                position: 'absolute',
                bottom: '0',
                left: '50%',
                width: '0',
                height: '0',
                border: '25px solid transparent',
                borderTopColor: theme.palette.background.paper,
                borderBottom: 0,
                marginLeft: '-25px',
                marginBottom: '-25px',
            },
            // border: `3px solid ${theme.palette.divider}`,
        },

        userButtons: {
            width: '80%',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& a, & div': {
                width: 'calc(50% - 6px)',
                margin: '3px',
                '& button': {
                    width: '100%',
                    height: '100%',
                },
            },
            '& div:last-child': {
                marginBottom: '3px',
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
            },
        },
        loggedUserButtons: {
            width: '80%',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& h2': {
                width: '100%',
                fontSize: 40,
            },
            '& div, & a': {
                margin: 3,
                height: '100%',
                width: '100%',
                '& button': {
                    width: '100%',
                },
            },
        },

        styledHeader: {
            display: 'block',
            width: '100%',
            color:
                theme.palette.type === 'light'
                    ? theme.palette.primary.dark
                    : '#eee',
            textAlign: 'center',
        },
        subHeader: {
            display: 'block',
            width: '100%',
            color: theme.palette.primary.main,
            textAlign: 'center',
        },
        pageLink: {
            textDecoration: 'none',
            '& button': {
                border: `2px solid ${theme.palette.primary.main}`,
                color:
                    theme.palette.type === 'light'
                        ? theme.palette.primary.dark
                        : '#ddd',
                fontWeight: 700,
            },
        },
        newValuation: {
            textDecoration: 'none',
            '& button': {
                border: `2px solid ${theme.palette.primary.main}`,
                backgroundColor:
                    theme.palette.type === 'light' ? '#937fd0' : '#774242',
                color: 'white',
                fontWeight: 700,
                '&:hover': {
                    backgroundColor:
                        theme.palette.type === 'light' ? '#8669be' : '#965454',
                },
            },
        },
    })
)
