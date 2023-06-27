import PropTypes from 'prop-types';
import {
    Alert,
    AlertTitle,
    Avatar,
    Badge,
    Box,
    IconButton,
    Popover,
    Stack,
    SvgIcon,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import {usePopover} from 'src/hooks/use-popover';
import {AccountPopover} from './account-popover';
import {alpha} from "@mui/material/styles";
import {Bars3Icon, BellIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getWarnings} from "../../api/logsReq";
import {formatDateTime} from "../../config/formatDate";
import Link from "next/link";

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
    const whereWarn = {
        isSolved: false
    }
    const {data: warnings, status, error} = useQuery(['warnings', whereWarn],
        () => getWarnings(whereWarn));

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
                                    color={(warnings?.logs?.length > 0) ? 'error': 'default'}
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
                            sx={{
                                maxHeight: '500px',
                                overflowY: 'scroll'
                            }}
                            anchorEl={anchorEl}
                            onClose={handleClosePopupNotif}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            {
                                (warnings?.logs?.length > 0) ? warnings?.logs?.map(err => {
                                    return (
                                        <Link href={'/logs'} style={{textDecoration: 'none'}}>
                                            <Alert
                                                severity="error">
                                                <AlertTitle>Внимание! {` ${formatDateTime(new Date(err.date))}`}</AlertTitle>
                                                {err.description}
                                            </Alert>
                                        </Link>
                                    )
                                }) : <Alert
                                    severity="info">
                                    {'Новых уведомлений нет'}
                                </Alert>
                            }
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
