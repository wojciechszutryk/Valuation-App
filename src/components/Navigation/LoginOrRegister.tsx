import ArchiveIcon from '@material-ui/icons/Archive'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { alpha, Button, Divider, Menu, MenuItem, MenuProps, styled } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.type === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function LoginOrRegister() {
    const { t } = useTranslation()
    let history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {t('Actions')}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { history.push('/valuation/new'); handleClose() }} disableRipple>
                    <FileCopyIcon />
                    {t('New Valuation')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { history.push('/login'); handleClose() }} disableRipple>
                    <MoreHorizIcon />
                    {t('Sign in')}
                </MenuItem>
                <MenuItem onClick={() => { history.push('/register'); handleClose() }} disableRipple>
                    <ArchiveIcon />
                    {t('Sign up')}
                </MenuItem>
            </StyledMenu>
        </div>
    );
}