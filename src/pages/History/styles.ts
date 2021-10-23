import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: 20,
        },
        textCenter: {},
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
