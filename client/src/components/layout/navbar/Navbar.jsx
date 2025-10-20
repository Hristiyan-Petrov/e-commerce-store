import { AppBar, Backdrop, Box, Button, Chip, Drawer, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; import { Link as RouterLink } from "react-router";
import AccountMenuItem from "./AccountMenuItem";
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

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenu] = useState(false);
    const toggleMobileMenu = () => setMobileMenu(prevState => !prevState);

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
                        onClick={toggleMobileMenu}
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

                    <AccountMenuItem />
                    <IconButton aria-label="mini shopping cart">
                        <ShoppingCartOutlinedIcon />
                    </IconButton>

                    <MobileMenuIcon open={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu}/>

                </Box>
            </Toolbar>
            <Box
                sx={{
                    position: 'absolute',
                    top: '56px',
                    left: 0,
                    right: 0,
                    height: 'calc(100vh - 56px)', // 56px is the default Toolbar height on mobile - only place where the mobile menu is visible
                    overflow: 'hidden',
                    pointerEvents: open ? 'auto' : 'none',
                }}
            >
                <MobileMenu open={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
            </Box>
        </AppBar >
    );
};

const MobileMenuIcon = ({open, toggleMobileMenu}) => {
    return (
        <IconButton
            aria-label="mobile menu"
            sx={{
                display: SHOW_MOBILE_ONLY
            }}
            onClick={toggleMobileMenu}
        >

            {/* {open
                            ? <CloseRoundedIcon />
                            : <MenuIcon />
                        } */}

            <Box sx={{
                position: 'relative',
                // Set a fixed size to prevent layout shift
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
                    // position: 'absolute',
                    transition: 'transform 0.3s, opacity 0.2s',
                    // When menu is open, rotate in and fade in
                    transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
                    opacity: open ? 1 : 0,
                }} />
            </Box>

        </IconButton>
    );
};


const MobileMenu = ({ open, toggleMobileMenu }) => {
    return (
        <Drawer
            open={open}
            anchor="top"
            variant="persistent"
            ModalProps={{
                // disablePortal: true,
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
                            onClick={toggleMobileMenu}
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

export default Navbar;