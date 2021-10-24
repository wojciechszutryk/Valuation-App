import * as React from 'react'
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    makeStyles,
    Menu,
    MenuItem,
    Tooltip,
} from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import { History } from '@material-ui/icons'
import { ExitToApp } from '@material-ui/icons'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import { showToast } from 'utils'
import { useAppDispatch } from 'utils/hooks/useAppDispach'
import {
    setToken,
    setUserId,
    setUserName,
} from 'data/state/actions/userActions'
import { userAccountDelete } from '../../data/fetch/userFetch'

const useStyles = makeStyles((theme) => ({
    avatar: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.light,
    },
    marginRight: {
        marginRight: 10,
    },
}))

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const { t } = useTranslation()
    let history = useHistory()
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const deleteUserMutation = useMutation((id: string) =>
        userAccountDelete({ id, token })
    )
    const userName = useAppSelector((state) => state.user.userName)
    const userId = useAppSelector((state) => state.user.userId)
    const token = useAppSelector((state) => state.user.token)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        dispatch(setUserId(''))
        dispatch(setUserName(''))
        dispatch(setToken(''))
        history.push('/')
        setAnchorEl(null)
    }
    const handleDeleteAccount = async () => {
        await deleteUserMutation.mutate(userId)
        await handleLogout()
        showToast(t('Account deleted successfully'))
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small">
                        <Avatar className={classes.avatar}>
                            {userName.slice(0, 1).toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem disabled>
                    <Avatar className={classes.marginRight} /> {userName}
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        history.push('/history')
                        handleClose()
                    }}
                >
                    <ListItemIcon>
                        <History fontSize="small" />
                    </ListItemIcon>
                    {t('Valuation History')}
                </MenuItem>
                <MenuItem onClick={handleDeleteAccount}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    {t('Delete account')}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    {t('Logout')}
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
