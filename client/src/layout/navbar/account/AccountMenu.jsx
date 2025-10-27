import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router";

import TopDrawerMenu from '../../../components/common/TopDrawerMenu';

const accountMenuItems = [
    { label: 'Profile', to: '/profile' },
    { label: 'Settings', to: '/settings' },
    { label: 'Logout', to: '#' },
];

export default function AccountMenu({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
}) {
    const [isAuth, setIsAuth] = useState(false);

    const handleLogout = () => {
        // Your logout logic would go here
        console.log('User logged out.');
        setIsAuth(false);
        toggle(); // Close the menu after logging out
    };

    // Hide menu on scroll
    useEffect(() => {
        if (!open) return;

        const handleScroll = () => toggle();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [open, toggle]);

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

            {isAuth && <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                {
                    accountMenuItems.map(link => (
                        <Link
                            key={link.label}
                            to={link.to}
                            component={RouterLink}
                            onClick={toggle}
                            sx={{
                                textDecoration: 'none',
                                fontWeight: '500',
                                p: 2,
                                borderBottomWidth: '2px',
                                borderBottomStyle: 'solid',
                                borderBottomColor: 'secondary.light'
                            }}
                        >
                            {link.label} {link.label === 'logout' && <LogoutOutlinedIcon />}
                        </Link>
                    ))
                }
            </Box>}


            {!isAuth && <Box sx={{
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
                    <Button component={RouterLink} to="/login" variant="contained">
                        Login
                    </Button>
                    <Button component={RouterLink} to="/register" variant="contained" color="secondary">
                        Create Account
                    </Button>
                </Box>
            </Box>}
        </TopDrawerMenu>
    );
};