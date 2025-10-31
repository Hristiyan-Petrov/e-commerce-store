import { Box, Stack, useMediaQuery, useTheme } from "@mui/system";
import { Typography, Button, Avatar, ListItemButton, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

import TopDrawerMenu from '../../../components/common/TopDrawerMenu';
import { useCloseOnScroll } from "../../../hooks/useCloseOnScroll";
import { useAuth } from "../../../context/AuthContext";
import { hoverBackgroundFill } from "../../../styles/common";

const accountMenuItems = [
    { label: 'Profile', to: '/profile' },
    { label: 'Settings', to: '/settings' },
    { label: 'Logout', icon: <LogoutRoundedIcon />, action: 'logout' },
];

export default function AccountMenu({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
}) {
    const { user, logout } = useAuth();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleItemClick = (action) => {
        if (action === 'logout') {
            logout()
                .then(() => {
                    console.log('User logged out.')
                })
                .catch(err => {
                    console.log('Logout attempt completed with error:', err);
                });
        }
        // Always close the drawer on any item click
        toggle();
    };

    useCloseOnScroll(open, toggle);

    return (
        <TopDrawerMenu
            open={open}
            sx={{
                width: { xs: '100%', sm: '50%', md: '30%', lg: '25%' },
                right: { sm: 0, xl: '15%' }
            }}
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            {...props}
        >

            {user ?
                // Logged in view
                (<Stack>
                    <Stack flexDirection='row' alignItems='center' p={2} gap={2}>
                        <Avatar
                            alt={user.name}
                            src={user.picture}
                        />
                        <Typography variant="h6" fontSize={'1rem'} gutterBottom>
                            Nice to meet you, {user.name}!
                        </Typography>
                    </Stack>
                    {
                        accountMenuItems.map(item => {
                            const SmallScreenStyles = {
                                textDecoration: 'none',
                                fontWeight: '500',
                                p: 2,
                                borderBottom: '2px solid',
                                borderBottomColor: 'secondary.light',
                                gap: 2,
                            };

                            const Icon = () => {
                                const iconStyles = { mr: 5, transition: 'opacity 0.2s' };
                                return item.label === 'Logout'
                                    ? <LogoutRoundedIcon sx={iconStyles} />
                                    : <KeyboardArrowRightRoundedIcon sx={iconStyles} />;
                            };

                            return (
                                <ListItemButton
                                    key={item.label}
                                    {...(item.to && {
                                        to: item.to,
                                        component: RouterLink
                                    })
                                    }
                                    onClick={() => handleItemClick(item.action)}
                                    sx={isSmallScreen ? SmallScreenStyles : hoverBackgroundFill()}
                                >
                                    {isSmallScreen ? (
                                        <>
                                            {item.label}
                                            {item.label === 'Logout' && <LogoutRoundedIcon sx={{ verticalAlign: 'bottom' }} />}
                                        </>
                                    ) : (
                                        <>
                                            <Icon />
                                            <ListItemText>{item.label}</ListItemText>
                                        </>
                                    )}
                                </ListItemButton>
                            );
                        })
                    }
                </Stack>
                ) : (
                    // Logged-out View
                    !user && <Box sx={{
                        p: 3,
                        textAlign: 'center',
                    }}>
                        <Typography variant="h6" gutterBottom>
                            Your Account Awaits
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Get access to your account and unlock exclusive offers.
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="contained"
                                onClick={() => toggle()}
                            >
                                Login
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/register"
                                variant="contained"
                                color="secondary"
                                onClick={() => toggle()}
                            >
                                Create Account
                            </Button>
                        </Box>
                    </Box>
                )
            }
        </TopDrawerMenu >
    );
};