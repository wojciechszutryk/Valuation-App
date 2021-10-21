import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalWrapper: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
        modal: {
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '300px',
            minHeight: '300px',
        },
        loadButton: {
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
