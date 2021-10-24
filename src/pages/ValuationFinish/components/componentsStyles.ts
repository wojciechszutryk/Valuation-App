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
                    : '#d5d5fc',
            color: theme.palette.type === 'dark' ? 'white' : 'black',
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
                    : '#d5d5fc',
            color: theme.palette.type === 'dark' ? 'white' : 'black',
        },
        important: {
            backgroundColor:
                theme.palette.type === 'dark' ? '#676767' : '#e6e6ff',
        },
        tableBodyRowWeights: {
            '&:nth-child(4n), &:nth-child(4n+3)': {
                backgroundColor:
                    theme.palette.type === 'dark' ? '#5d5d5d' : '#e6e6ff',
            },
        },
        tableBodyRowWeightsValues: {
            backgroundColor:
                theme.palette.type === 'dark'
                    ? theme.palette.secondary.dark
                    : '#e6e6ff',
            color: 'white',
        },
        tableBodyWithCheckboxCell: {
            padding: '5px 8px',
            width: '50px',
            '& span': {
                padding: 0,
                width: '50px',
                marginLeft: 'auto',
            },
        },
        upperCase: {
            'text-transform': 'capitalize',
        },
        alignRight: {
            textAlign: 'right',
        },
        priceSummary: {
            fontWeight: 'bold',
            color: theme.palette.secondary.dark,
        },
        summaryHeader: {
            color:
                theme.palette.type === 'light'
                    ? theme.palette.primary.light
                    : '#ddd',
        },
        summaryBox: {
            display: 'flex',
            '& h2:nth-child(2)': {
                color: theme.palette.secondary.dark,
            },
            '@media (max-width: 900px)': {
                flexDirection: 'column',
            },
        },
        exportChild: {
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            '& h5': {
                color:
                    theme.palette.type === 'light'
                        ? theme.palette.secondary.dark
                        : '#fff',
            },
            '&>*': {
                marginBottom: 10,
            },
            '& button': {
                marginBottom: 0,
            },
        },
        addObjectsToValuationError: {
            marginBottom: 20,
        },
        loaderCenter: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
)
