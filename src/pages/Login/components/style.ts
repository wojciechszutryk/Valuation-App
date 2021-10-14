import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        error: {
            fontSize: '12px',
            color: 'red',
            width: '400px',
            marginTop: '0.25rem',
            '&:before': {
                content: '"❌"',
                fontSize: '10px',
            }
        },
        wrapper: {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        container: {
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        input: {
            borderWidth: '3px',
            marginBottom: 10,
        },
        submitButton: {
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.type === 'light'
                ? theme.palette.primary.main
                : theme.palette.secondary.dark,
            color: 'white',
            fontWeight: 700,
            '&:hover': {
                backgroundColor: theme.palette.type === 'light'
                    ? theme.palette.primary.light
                    : theme.palette.divider,
            }
        }

    })
)
