import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
        },
        loadButton: {
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
    })
)
