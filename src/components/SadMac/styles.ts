import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        styledSadMac: {
            fontSize: '9px',
            position: 'relative',
            background: theme.palette.primary.light,
            margin: '7em auto 7em auto',
            width: '23em',
            height: '30em',

            '&:before': {
                content: "''",
                display: 'block',
                width: '1em',
                height: '1em',
                transform: 'translate(-1em, -1em)',
                boxShadow: `1em 1em ${theme.palette.background.default}, 23em 1em ${theme.palette.background.default}, 4em 3em ${theme.palette.background.default}, 5em 3em ${theme.palette.background.default}, 6em 3em ${theme.palette.background.default}, 7em 3em ${theme.palette.background.default}, 8em 3em ${theme.palette.background.default}, 9em 3em ${theme.palette.background.default}, 10em 3em ${theme.palette.background.default}, 11em 3em ${theme.palette.background.default}, 12em 3em ${theme.palette.background.default}, 13em 3em ${theme.palette.background.default}, 14em 3em ${theme.palette.background.default}, 15em 3em ${theme.palette.background.default}, 16em 3em ${theme.palette.background.default}, 17em 3em ${theme.palette.background.default}, 18em 3em ${theme.palette.background.default}, 19em 3em ${theme.palette.background.default}, 20em 3em ${theme.palette.background.default}, 3em 4em ${theme.palette.background.default}, 21em 4em ${theme.palette.background.default}, 3em 5em ${theme.palette.background.default}, 21em 5em ${theme.palette.background.default}, 3em 6em ${theme.palette.background.default}, 7em 6em ${theme.palette.background.default}, 9em 6em ${theme.palette.background.default}, 15em 6em ${theme.palette.background.default}, 17em 6em ${theme.palette.background.default}, 21em 6em ${theme.palette.background.default}, 3em 7em ${theme.palette.background.default}, 8em 7em ${theme.palette.background.default}, 16em 7em ${theme.palette.background.default}, 21em 7em ${theme.palette.background.default}, 3em 8em ${theme.palette.background.default}, 7em 8em ${theme.palette.background.default}, 9em 8em ${theme.palette.background.default}, 15em 8em ${theme.palette.background.default}, 17em 8em ${theme.palette.background.default}, 21em 8em ${theme.palette.background.default}, 3em 9em ${theme.palette.background.default}, 21em 9em ${theme.palette.background.default}, 3em 10em ${theme.palette.background.default}, 10em 10em ${theme.palette.background.default}, 13em 10em ${theme.palette.background.default}, 21em 10em ${theme.palette.background.default}, 3em 11em ${theme.palette.background.default}, 11em 11em ${theme.palette.background.default}, 12em 11em ${theme.palette.background.default}, 21em 11em ${theme.palette.background.default}, 3em 12em ${theme.palette.background.default}, 21em 12em ${theme.palette.background.default}, 3em 13em ${theme.palette.background.default}, 10em 13em ${theme.palette.background.default}, 11em 13em ${theme.palette.background.default}, 12em 13em ${theme.palette.background.default}, 13em 13em ${theme.palette.background.default}, 14em 13em ${theme.palette.background.default}, 21em 13em ${theme.palette.background.default}, 3em 14em ${theme.palette.background.default}, 9em 14em ${theme.palette.background.default}, 15em 14em ${theme.palette.background.default}, 16em 14em ${theme.palette.background.default}, 21em 14em ${theme.palette.background.default}, 3em 15em ${theme.palette.background.default}, 17em 15em ${theme.palette.background.default}, 21em 15em ${theme.palette.background.default}, 3em 16em ${theme.palette.background.default}, 21em 16em ${theme.palette.background.default}, 4em 17em ${theme.palette.background.default}, 5em 17em ${theme.palette.background.default}, 6em 17em ${theme.palette.background.default}, 7em 17em ${theme.palette.background.default}, 8em 17em ${theme.palette.background.default}, 9em 17em ${theme.palette.background.default}, 10em 17em ${theme.palette.background.default}, 11em 17em ${theme.palette.background.default}, 12em 17em ${theme.palette.background.default}, 13em 17em ${theme.palette.background.default}, 14em 17em ${theme.palette.background.default}, 15em 17em ${theme.palette.background.default}, 16em 17em ${theme.palette.background.default}, 17em 17em ${theme.palette.background.default}, 18em 17em ${theme.palette.background.default}, 19em 17em ${theme.palette.background.default}, 20em 17em ${theme.palette.background.default}, 3em 22em ${theme.palette.background.default}, 4em 22em ${theme.palette.background.default}, 5em 22em ${theme.palette.background.default}, 14em 22em ${theme.palette.background.default}, 15em 22em ${theme.palette.background.default}, 16em 22em ${theme.palette.background.default}, 17em 22em ${theme.palette.background.default}, 18em 22em ${theme.palette.background.default}, 19em 22em ${theme.palette.background.default}, 20em 22em ${theme.palette.background.default}, 1em 27em ${theme.palette.background.default}, 2em 27em ${theme.palette.background.default}, 3em 27em ${theme.palette.background.default}, 4em 27em ${theme.palette.background.default}, 5em 27em ${theme.palette.background.default}, 6em 27em ${theme.palette.background.default}, 7em 27em ${theme.palette.background.default}, 8em 27em ${theme.palette.background.default}, 9em 27em ${theme.palette.background.default}, 10em 27em ${theme.palette.background.default}, 11em 27em ${theme.palette.background.default}, 12em 27em ${theme.palette.background.default}, 13em 27em ${theme.palette.background.default}, 14em 27em ${theme.palette.background.default}, 15em 27em ${theme.palette.background.default}, 16em 27em ${theme.palette.background.default}, 17em 27em ${theme.palette.background.default}, 18em 27em ${theme.palette.background.default}, 19em 27em ${theme.palette.background.default}, 20em 27em ${theme.palette.background.default}, 21em 27em ${theme.palette.background.default}, 22em 27em ${theme.palette.background.default}, 23em 27em ${theme.palette.background.default}, 1em 28em ${theme.palette.background.default}, 23em 28em ${theme.palette.background.default}, 1em 29em ${theme.palette.background.default}, 23em 29em ${theme.palette.background.default}, 1em 30em ${theme.palette.background.default}, 23em 30em ${theme.palette.background.default}`,
            },
            [theme.breakpoints.down('md')]: {
                fontSize: '5px',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '3px',
            },
        },
        styledHappyMac: {
            '&:before': {
                boxShadow: `1em 1em ${theme.palette.background.default}
                    , 23em 1em ${theme.palette.background.default}
                    , 4em 3em ${theme.palette.background.default}
                    , 5em 3em ${theme.palette.background.default}
                    , 6em 3em ${theme.palette.background.default}
                    , 7em 3em ${theme.palette.background.default}
                    , 8em 3em ${theme.palette.background.default}
                    , 9em 3em ${theme.palette.background.default}
                    , 10em 3em ${theme.palette.background.default}
                    , 11em 3em ${theme.palette.background.default}
                    , 12em 3em ${theme.palette.background.default}
                    , 13em 3em ${theme.palette.background.default}
                    , 14em 3em ${theme.palette.background.default}
                    , 15em 3em ${theme.palette.background.default}
                    , 16em 3em ${theme.palette.background.default}
                    , 17em 3em ${theme.palette.background.default}
                    , 18em 3em ${theme.palette.background.default}
                    , 19em 3em ${theme.palette.background.default}
                    , 20em 3em ${theme.palette.background.default}
                    , 3em 4em ${theme.palette.background.default}
                    , 21em 4em ${theme.palette.background.default}
                    , 3em 5em ${theme.palette.background.default}
                    , 21em 5em ${theme.palette.background.default}
                    , 3em 6em ${theme.palette.background.default}
                    , 7em 6em ${theme.palette.background.default}
                    , 9em 6em ${theme.palette.background.default}
                    , 15em 6em ${theme.palette.background.default}
                    , 17em 6em ${theme.palette.background.default}
                    , 21em 6em ${theme.palette.background.default}
                    , 3em 7em ${theme.palette.background.default}
                    , 8em 7em ${theme.palette.background.default}
                    , 16em 7em ${theme.palette.background.default}
                    , 21em 7em ${theme.palette.background.default}
                    , 3em 8em ${theme.palette.background.default}
                    , 7em 8em ${theme.palette.background.default}
                    , 9em 8em ${theme.palette.background.default}
                    , 15em 8em ${theme.palette.background.default}
                    , 17em 8em ${theme.palette.background.default}
                    , 21em 8em ${theme.palette.background.default}
                    , 3em 9em ${theme.palette.background.default}
                    , 21em 9em ${theme.palette.background.default}
                    , 3em 10em ${theme.palette.background.default}
                    , 10em 10em ${theme.palette.background.default}
                    , 13em 10em ${theme.palette.background.default}
                    , 21em 10em ${theme.palette.background.default}
                    , 3em 11em ${theme.palette.background.default}
                    , 11em 11em ${theme.palette.background.default}
                    , 12em 11em ${theme.palette.background.default}
                    , 21em 11em ${theme.palette.background.default}
                    , 3em 12em ${theme.palette.background.default}
                    , 21em 12em ${theme.palette.background.default}
                    , 3em 13em ${theme.palette.background.default}
                    , 10em 13em ${theme.palette.background.default}
                    , 11em 13em ${theme.palette.background.default}
                    , 12em 13em ${theme.palette.background.default}
                    , 13em 13em ${theme.palette.background.default}
                    , 14em 13em ${theme.palette.background.default}
                    , 21em 13em ${theme.palette.background.default}
                    , 3em 14em ${theme.palette.background.default}
                    , 9em 12em ${theme.palette.background.default}
                    , 15em 12em ${theme.palette.background.default}
                    , 21em 14em ${theme.palette.background.default}
                    , 3em 15em ${theme.palette.background.default}
                    , 21em 15em ${theme.palette.background.default}
                    , 3em 16em ${theme.palette.background.default}
                    , 21em 16em ${theme.palette.background.default}
                    , 4em 17em ${theme.palette.background.default}
                    , 5em 17em ${theme.palette.background.default}
                    , 6em 17em ${theme.palette.background.default}
                    , 7em 17em ${theme.palette.background.default}
                    , 8em 17em ${theme.palette.background.default}
                    , 9em 17em ${theme.palette.background.default}
                    , 10em 17em ${theme.palette.background.default}
                    , 11em 17em ${theme.palette.background.default}
                    , 12em 17em ${theme.palette.background.default}
                    , 13em 17em ${theme.palette.background.default}
                    , 14em 17em ${theme.palette.background.default}
                    , 15em 17em ${theme.palette.background.default}
                    , 16em 17em ${theme.palette.background.default}
                    , 17em 17em ${theme.palette.background.default}
                    , 18em 17em ${theme.palette.background.default}
                    , 19em 17em ${theme.palette.background.default}
                    , 20em 17em ${theme.palette.background.default}
                    , 3em 22em ${theme.palette.background.default}
                    , 4em 22em ${theme.palette.background.default}
                    , 5em 22em ${theme.palette.background.default}
                    , 14em 22em ${theme.palette.background.default}
                    , 15em 22em ${theme.palette.background.default}
                    , 16em 22em ${theme.palette.background.default}
                    , 17em 22em ${theme.palette.background.default}
                    , 18em 22em ${theme.palette.background.default}
                    , 19em 22em ${theme.palette.background.default}
                    , 20em 22em ${theme.palette.background.default}
                    , 1em 27em ${theme.palette.background.default}
                    , 2em 27em ${theme.palette.background.default}
                    , 3em 27em ${theme.palette.background.default}
                    , 4em 27em ${theme.palette.background.default}
                    , 5em 27em ${theme.palette.background.default}
                    , 6em 27em ${theme.palette.background.default}
                    , 7em 27em ${theme.palette.background.default}
                    , 8em 27em ${theme.palette.background.default}
                    , 9em 27em ${theme.palette.background.default}
                    , 10em 27em ${theme.palette.background.default}
                    , 11em 27em ${theme.palette.background.default}
                    , 12em 27em ${theme.palette.background.default}
                    , 13em 27em ${theme.palette.background.default}
                    , 14em 27em ${theme.palette.background.default}
                    , 15em 27em ${theme.palette.background.default}
                    , 16em 27em ${theme.palette.background.default}
                    , 17em 27em ${theme.palette.background.default}
                    , 18em 27em ${theme.palette.background.default}
                    , 19em 27em ${theme.palette.background.default}
                    , 20em 27em ${theme.palette.background.default}
                    , 21em 27em ${theme.palette.background.default}
                    , 22em 27em ${theme.palette.background.default}
                    , 23em 27em ${theme.palette.background.default}
                    , 1em 28em ${theme.palette.background.default}
                    , 23em 28em ${theme.palette.background.default}
                    , 1em 29em ${theme.palette.background.default}
                    , 23em 29em ${theme.palette.background.default}
                    , 1em 30em ${theme.palette.background.default}
                    , 23em 30em ${theme.palette.background.default}
                    `,
            },
        },
        styledEyes: {
            fontSize: '9px',
            position: 'absolute',
            top: '7em',
            transform: 'translateY(-50%)',
            width: '23em',
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
                fontSize: '5px',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '3px',
            },
        },
        styledEye: {
            fontSize: '9px',
            width: '5em',
            height: '5em',
            background: theme.palette.background.default,
            display: 'inline-block',
            margin: '2em',
            borderRadius: '40%',
            position: 'relative',
            overflow: 'hidden',
            [theme.breakpoints.down('md')]: {
                fontSize: '5px',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '3px',
            },
        },
        styledBall: {
            fontSize: '9px',
            width: '3em',
            height: '3em',
            background: theme.palette.divider,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
        },
    })
)
