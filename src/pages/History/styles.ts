import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: 20,
        },
        container: {
            marginTop: 20,
        },
        loaderCenter: {
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            marginTop: 20,
            textAlign: 'center',
            fontSize: 30,
            color: theme.palette.primary.main,
        },
        tableContainer: {
            marginBottom: 20,
        },
        table: {
            minWidth: 650,
        },
        tableHeadCell: {
            padding: '8px',
            textAlign: 'center',
            textTransform: 'capitalize',
            backgroundColor:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : '#d5d5fc',
            color: theme.palette.type === 'dark' ? 'white' : 'black',
        },
        tableBodyRow: {
            '&:nth-child(2n+1)': {
                backgroundColor:
                    theme.palette.type === 'dark' ? '#5d5d5d' : '#e6e6ff',
            },
        },
        tableBodyCell: {
            padding: '5px 8px',
            textAlign: 'center',
        },
        header: {
            color:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : theme.palette.secondary.main,
        },
    })
)
