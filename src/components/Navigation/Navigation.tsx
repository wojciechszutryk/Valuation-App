import {
    AppBar,
    Button,
    Container,
    createStyles,
    Drawer,
    Hidden,
    IconButton,
    makeStyles,
    Toolbar,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { LanguageSwitcher } from '../index'
import { ThemeSwitcher } from '../Theme'
import Logo from './Logo'

const useStyles = makeStyles((theme) => {
    return createStyles({
        nav: {
            borderBottom: '2px solid ' + theme.palette.divider,
        },
        flex: {
            display: 'flex',
        },
        list: {
            paddingTop: 30,
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        fullList: {
            width: 'auto',
        },
        spaceAround: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        flexGrow: {
            flexGrow: 1,
        },
    })
})

const Navigation: React.FC = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const toggleDrawer =
        (o: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return
            }
            setOpen(o)
        }

    return (
        <nav className={classes.nav}>
            <Hidden xsDown>
                <AppBar position="static">
                    <Container>
                        <Toolbar>
                            <Logo inDrawer={false} />
                            <div className={classes.flexGrow} />
                            <ThemeSwitcher />
                            <LanguageSwitcher />
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Hidden>

            <Hidden smUp>
                <AppBar position="static">
                    <Container>
                        <Toolbar className={classes.spaceAround}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setOpen(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Logo inDrawer={false} />
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <div className={classes.list} role="presentation">
                        <Logo inDrawer={true} />
                        <ThemeSwitcher />
                        <LanguageSwitcher />
                        <Button color="inherit">Login</Button>
                    </div>
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default Navigation
