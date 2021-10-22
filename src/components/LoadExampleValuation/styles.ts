import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
        },
        loadButton: {
            border: `2px solid ${theme.palette.primary.main}`,
            marginTop: 5,
            backgroundColor:
                theme.palette.type === 'light'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.dark,
            color: 'white',
            fontWeight: 700,
            '&:hover': {
                backgroundColor:
                    theme.palette.type === 'light'
                        ? theme.palette.primary.light
                        : theme.palette.divider,
            },
        }
    })
)
