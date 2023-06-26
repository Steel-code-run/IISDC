import PropTypes from 'prop-types';
import {
    Avatar,
    Badge,
    Box,
    IconButton,
    Popover,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import {usePopover} from 'src/hooks/use-popover';
import {AccountPopover} from './account-popover';
import {alpha} from "@mui/material/styles";
import {Bars3Icon, BellIcon} from "@heroicons/react/24/solid";
import {useState} from "react";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {onNavOpen} = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const accountPopover = usePopover();


    const handleClickPopupNotif = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopupNotif = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'id-notif' : undefined;

    return (
        <>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: 0,
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    zIndex: (theme) => theme.zIndex.appBar
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2
                    }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                    >
                        {!lgUp && (
                            <IconButton onClick={onNavOpen}>
                                <SvgIcon fontSize="small">
                                    <Bars3Icon/>
                                </SvgIcon>
                            </IconButton>
                        )}
                        {/*<Tooltip title="Search">*/}
                        {/*  <IconButton>*/}
                        {/*    <SvgIcon fontSize="small">*/}
                        {/*      <MagnifyingGlassIcon />*/}
                        {/*    </SvgIcon>*/}
                        {/*  </IconButton>*/}
                        {/*</Tooltip>*/}
                    </Stack>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                    >
                        {/*<Tooltip title="Contacts">*/}
                        {/*  <IconButton>*/}
                        {/*    <SvgIcon fontSize="small">*/}
                        {/*      <UsersIcon />*/}
                        {/*    </SvgIcon>*/}
                        {/*  </IconButton>*/}
                        {/*</Tooltip>*/}
                        <Tooltip title="Notifications">
                            <IconButton onClick={handleClickPopupNotif}
                                        sx={{cursor: 'pointer'}}
                                        aria-describedby={id}>
                                <Badge
                                    badgeContent={4}
                                    color="success"
                                    variant="dot"
                                >
                                    <SvgIcon fontSize="small">
                                        <BellIcon/>
                                    </SvgIcon>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Popover
                            id={'id-bell'}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClosePopupNotif}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{p: 2}}>The content of the Popover.</Typography>
                        </Popover>
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{
                                cursor: 'pointer',
                                height: 40,
                                width: 40
                            }}
                            src="/assets/avatars/defaultUserLogo.png"
                        />
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
            />
        </>
    );
};

TopNav.propTypes = {
    onNavOpen: PropTypes.func
};
