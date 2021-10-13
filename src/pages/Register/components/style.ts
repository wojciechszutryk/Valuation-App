import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        styledErrorMessage: {
            fontSize: '12px',
            color: 'red',
            width: '400px',
            marginTop: '0.25rem',
            '&:before': {
                content: '"❌"',
                fontSize: '10px',
            }
        }
    })
)
