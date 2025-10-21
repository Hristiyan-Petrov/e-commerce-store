import { AppBar, Box, Button, Chip, Drawer, IconButton, Link, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; import { Link as RouterLink } from "react-router";
import AccountMenuItem from "./AccountMenuItem";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { HIDE_MOBILE, SHOW_MD_UP, SHOW_MOBILE_ONLY, SHOW_UP_MD } from "../../../constants/breakpoints";
import { useState } from "react";

const navigationLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Software', to: '/software' },
    { label: 'Deals', to: '/shop/deals' },
];

const accountMenuItems = [
    { label: 'Profile', to: '/profile' },
    { label: 'Settings', to: '/settings' },
    { label: 'Logout', to: '#' },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(prevState => !prevState);
        setAccountMenuOpen(false);
    }

    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const toggleAcountMenu = () => {
        setAccountMenuOpen(prevState => !prevState);
        setMobileMenuOpen(false);
    }


    const handleSearch = () => {
        console.log('You clicked search.');
    };


    return (
        <AppBar sx={{ position: 'static', backgroundColor: 'white' }}>
            <Toolbar sx={{
                justifyContent: { xs: "space-between", xl: 'space-evenly' },
            }}>

                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    gap: 5,
                }}>
                    <IconButton aria-label="mini shopping cart">
                        <HomeRoundedIcon fontSize="large" />
                    </IconButton>

                    <Box
                        sx={{
                            display: HIDE_MOBILE,
                            gap: 5,
                            alignItems: 'center',
                            component: 'header',
                        }}>
                        {navigationLinks.map(link => (
                            <Link
                                key={link.label}
                                to={link.to}
                                component={RouterLink}
                                sx={{
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '2rem',
                                        left: 0,
                                        right: 0,
                                        height: '5px',
                                        backgroundColor: 'primary.main',
                                        transform: 'scaleX(0)',
                                        transformOrigin: 'right',
                                        transition: 'transform 0.2s',
                                    },
                                    '&:hover::after': {
                                        transform: 'scaleX(1)',
                                        transformOrigin: 'left',
                                    }
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: 'center'
                }}>
                    <Chip
                        sx={{
                            display: HIDE_MOBILE,
                            pl: 10,
                            '& .MuiChip-icon': {
                                color: 'secondary.main'
                            }
                        }}
                        onClick={handleSearch}
                        icon={<SearchOutlinedIcon />}
                    />
                    <IconButton
                        sx={{
                            display: { sm: 'none' },
                            color: 'secondary.main'
                        }}
                        aria-label="search product"

                    >
                        <SearchOutlinedIcon />
                    </IconButton>

                    <AccountMenuIcon open={accountMenuOpen} toggleMenu={toggleAcountMenu} />

                    <IconButton aria-label="mini shopping cart">
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                    <MobileMenuIcon open={mobileMenuOpen} toggleMenu={toggleMobileMenu} />


                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        // top: 0,
                        left: 0,
                        right: 0,
                        height: 'calc(100vh - 56px)', // 56px is the default Toolbar height on mobile - only place where the mobile menu is visible
                        overflow: 'hidden',
                        pointerEvents: mobileMenuOpen || accountMenuOpen ? 'auto' : 'none',
                    }}
                >
                    {/* Menus */}
                    <MobileMenu
                        open={mobileMenuOpen}
                        toggleMenu={toggleMobileMenu}
                    />
                    <AccountMenu
                        open={accountMenuOpen}
                        toggleMenu={toggleAcountMenu}
                    />
                </Box>
            </Toolbar>

        </AppBar >
    );
};

const MobileMenuIcon = ({ open, toggleMenu }) => {
    return (
        <IconButton
            aria-label="mobile menu"
            sx={{
                display: SHOW_MOBILE_ONLY
            }}
            onClick={toggleMenu}
        >

            <Box sx={{
                width: 24,
                height: 24,
            }}>
                <MenuIcon sx={{
                    position: 'absolute',
                    transition: 'transform 0.3s, opacity 0.2s',
                    // When menu is open, rotate and fade out
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    opacity: open ? 0 : 1,
                }} />
                <CloseRoundedIcon sx={{
                    transition: 'transform 0.3s, opacity 0.2s',
                    // When menu is open, rotate in and fade in
                    transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
                    opacity: open ? 1 : 0,
                }} />
            </Box>

        </IconButton>
    );
};

const MobileMenu = ({ open, toggleMenu }) => {
    return (
        <Drawer
            open={open}
            anchor="top"
            variant="persistent"
            ModalProps={{
                disablePortal: true,
                keepMounted: false // Don't keep in the DOM when closed
            }}
            sx={{
                position: "absolute",
                width: '100%'
            }}
            PaperProps={{
                sx: {
                    position: 'relative',
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopColor: 'primary.main',
                    borderTopWidth: '5px',
                    borderTopStyle: 'solid',
                }}>
                {
                    navigationLinks.map(link => (
                        <Link
                            key={link.label}
                            to={link.to}
                            component={RouterLink}
                            onClick={toggleMenu}
                            sx={{
                                textDecoration: 'none',
                                fontWeight: '500',
                                p: 2,
                                borderBottomWidth: '2px',
                                borderBottomStyle: 'solid',
                                borderBottomColor: 'secondary.light'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))
                }
            </Box>
        </Drawer>
    );
};

const AccountMenuIcon = ({ open, toggleMenu }) => {
    return (
        <IconButton
            aria-label="account icon"
            onClick={toggleMenu}
        >

            {/* <PersonIcon
                sx={{
                    transition: 'fill 0.3s ease-in-out',
                    // If open, fill with current color. If not, make the fill transparent.
                    fill: open ? 'currentColor' : 'transparent',
                    // Always have a stroke color
                    stroke: 'currentColor',
                    // When not open, set a stroke width to create the outline.
                    // Adjust the value (e.g., 1, 1.5) to get your desired thickness.
                    // When open, the fill will cover the stroke, so we can set it to 0.
                    strokeWidth: open ? 0 : 1,
                }}
            /> */}

            {open
                ? <PersonIcon />
                : <PersonOutlinedIcon />
            }

            {/* <Box sx={{
                position: 'relative',
                // Set a fixed size to prevent layout shift
                width: 24,
                height: 24,
            }}>
                <PersonOutlinedIcon sx={{
                    position: 'absolute',
                    transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                    opacity: open ? 0 : 1,
                    transform: open ? 'scale(0.8)' : 'scale(1)',
                }} />
                <PersonIcon sx={{
                    transition: 'transform 0.3s, opacity 0.2s',
                    transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                    opacity: open ? 1 : 0,
                    transform: open ? 'scale(1)' : 'scale(0.8)',
                }} />
            </Box> */}

        </IconButton>
    );
};

const AccountMenu = ({ open, toggleMenu }) => {
    const isAuth = false;
    return (
        <Drawer
            open={open}
            anchor="top"
            variant="persistent"
            ModalProps={{
                disablePortal: true,
                keepMounted: false // Don't keep in the DOM when closed
            }}
            sx={{
                position: "absolute",
                width: { xs: '100%', sm: '50%', md: '30%', lg: '25%'},
                right: {sm: 0, xl: '15%'}
            }}
            PaperProps={{
                sx: {
                    position: 'relative',
                }
            }}
        >

            {isAuth && <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopColor: 'primary.main',
                    borderTopWidth: '5px',
                    borderTopStyle: 'solid',
                }}>
                {
                    accountMenuItems.map(link => (
                        <Link
                            key={link.label}
                            to={link.to}
                            component={RouterLink}
                            onClick={toggleMenu}
                            sx={{
                                textDecoration: 'none',
                                fontWeight: '500',
                                p: 2,
                                borderBottomWidth: '2px',
                                borderBottomStyle: 'solid',
                                borderBottomColor: 'secondary.light'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))
                }
            </Box>}


            {!isAuth && <Box sx={{
                p: 3,
                textAlign: 'center',
                borderTopColor: 'primary.main',
                borderTopWidth: '5px',
                borderTopStyle: 'solid',
            }}>
                <Typography variant="h6" gutterBottom>
                    Your Account Awaits
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Get access to your account and unlock exclusive offers.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button component={RouterLink} to="/register" variant="contained">
                        Login
                    </Button>
                    <Button component={RouterLink} to="/login" variant="contained" color="secondary">
                        Create Account
                    </Button>
                </Box>
            </Box>}
        </Drawer>
    );
};

export default Navbar;