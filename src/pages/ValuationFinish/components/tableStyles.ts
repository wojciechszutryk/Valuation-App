import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            color:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : theme.palette.secondary.main,
        },
        table: {
            minWidth: 650,
        },
        tableContainer: {
            marginBottom: 20,
        },
        tableHeadCell: {
            padding: '8px',
            textTransform: 'capitalize',
            backgroundColor:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : theme.palette.secondary.main,
            color: 'white',
        },
        tableHeadCellWeights: {
            padding: '8px',
            textTransform: 'capitalize',
            backgroundColor:
                theme.palette.type === 'dark' ? '#777777' : '#d5d5fc',
        },
        tableBodyCell: {
            padding: '5px 8px',
        },
        tableBodyRow: {
            '&:nth-child(2n+1)': {
                backgroundColor:
                    theme.palette.type === 'dark' ? '#5d5d5d' : '#e6e6ff',
            },
        },
        tableBodyValuationObjectRow: {
            padding: '5px 8px',
            backgroundColor:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : theme.palette.secondary.main,
            color: 'white',
        },
        important: {
            backgroundColor:
                theme.palette.type === 'dark' ? '#676767' : '#c5c4ff',
        },
        tableBodyRowWeights: {
            '&:nth-child(4n), &:nth-child(4n+3)': {
                backgroundColor:
                    theme.palette.type === 'dark' ? '#5d5d5d' : '#e6e6ff',
            },
        },
    })
)
