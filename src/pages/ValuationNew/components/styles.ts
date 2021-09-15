import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paperProp: {
            padding: 20,
            marginBottom: 20,
        },
        sliderDescriptionWrapper: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            marginBottom: 10,
        },
        sliderDescription: {
            marginRight: theme.spacing(2),
            whiteSpace: 'nowrap',
        },
        sliderValues: {
            color: theme.palette.primary.main,
        },
        paper: {
            marginBottom: 20,
            padding: 20,
        },
        header: {
            marginBottom: theme.spacing(2),
        },
        form: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        objectWrapper: {
            flexBasis: '100%',
            display: 'flex',
        },
        avatar: {
            backgroundColor: theme.palette.primary.light,
        },
        textField: {
            flexGrow: 1,
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(0.5),
        },
        newButton: {
            flexBasis: '100%',
        },
        delete: {
            backgroundColor: theme.palette.primary.light,
            cursor: 'pointer',
        },
        paperObj: {
            marginBottom: 20,
            padding: 20,
            display: 'flex',
            flexWrap: 'wrap',
        },
        headerObj: {
            color: theme.palette.primary.light,
            lineHeight: 1.7,
        },
    })
)
