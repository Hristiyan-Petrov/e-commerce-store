import { AppBar, Autocomplete, Avatar, Box, Button, Chip, Container, Drawer, IconButton, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Toolbar, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link as RouterLink } from "react-router";
import AccountMenuItem from "./AccountMenuItem";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { HIDE_MOBILE, SHOW_MD_UP, SHOW_MOBILE_ONLY, SHOW_UP_MD } from "../../../constants/breakpoints";
import { useEffect, useState } from "react";
import { fetchAll } from '../../../api/product';

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

const searchRelatedLinks = [
    { label: 'Mice', to: '/shop/mice' },
    { label: 'Keyborads', to: '/shop/keyboards' },
    { label: 'Monitors', to: '/shop/monitors' },
    { label: 'New Arivals', to: '/shop/new-arrivals' },
];

const Navbar = () => {
    const [products, setProducts] = useState([]);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(prevState => !prevState);
        setAccountMenuOpen(false);
        setSearchMenuOpen(false);
    };

    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const toggleAcountMenu = () => {
        setAccountMenuOpen(prevState => !prevState);
        setMobileMenuOpen(false);
        setSearchMenuOpen(false);
    };

    const [searchMenuOpen, setSearchMenuOpen] = useState(false);
    const toggleSearchMenu = () => {
        setSearchMenuOpen(prevState => !prevState);
        setMobileMenuOpen(false);
        setAccountMenuOpen(false);
    };

    const handleSearch = () => {
        console.log('You clicked search.');
    };

    useEffect(() => {
        const getProducts = async () => {
            fetchAll()
                .then(products => {
                    setProducts(products);
                    console.log(products);

                })
                .catch(err => {
                    console.log('ERROR' + err);
                })
        };

        getProducts();
    }, []);


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
                        onClick={toggleSearchMenu}
                        icon={<SearchOutlinedIcon />}
                    />

                    <SearchMenuIcon open={searchMenuOpen} toggleMenu={toggleSearchMenu} />

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
                        pointerEvents: mobileMenuOpen || accountMenuOpen || searchMenuOpen ? 'auto' : 'none',
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
                    <SearchMenu
                        open={searchMenuOpen}
                        toggleMenu={toggleSearchMenu}
                        products={products}
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
                width: { xs: '100%', sm: '50%', md: '30%', lg: '25%' },
                right: { sm: 0, xl: '15%' }
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
                            {link.label} {link.label === 'logout' && <LogoutOutlinedIcon />}
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

const SearchMenuIcon = ({ open, toggleMenu }) => {
    return (
        <IconButton
            sx={{
                display: { sm: 'none' },
                color: 'secondary.main'
            }}
            aria-label="search product"
            onClick={toggleMenu}
        >
            {open
                ? <SearchOffIcon />
                : <SearchOutlinedIcon />
            }
        </IconButton>
    );
};

const SearchMenu = ({ open, toggleMenu, products }) => {
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
                    height: 'fit-content',
                    minWidth: { md: '75%', lg: '50%' },
                    m: { md: '0 auto' }
                }}>
                <Container
                    component='section'
                    sx={{
                        textAlign: "center",
                        pt: 2,
                        pb: 2
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                pb: 2
                            }}
                        >
                            Suggested searches
                        </Typography>
                        <CancelOutlinedIcon
                            onClick={toggleMenu}
                        />
                    </Box>

                    <List>
                        {searchRelatedLinks.map(link => (
                            <ListItemButton
                                key={link.label}
                                component={RouterLink}
                                to={link.to}

                                sx={{
                                    maxWidth: '90%',
                                    transition: 'background-color 0.7s',
                                    borderRadius: 5,
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: 'primary.light',
                                        transition: 'background-color 0.2s',
                                        '& .MuiSvgIcon-root': {
                                            opacity: 1,
                                            transition: 'opacity 0.2s'
                                        }
                                    }
                                }}
                            >
                                <KeyboardArrowRightRoundedIcon sx={{
                                    mr: 5,
                                    opacity: 0,
                                    transition: 'opacity 0.2s'
                                }}
                                />
                                <ListItemText>
                                    {link.label}
                                </ListItemText>
                            </ListItemButton>
                        ))}

                    </List>
                </Container>
                <Divider />
                <Container
                    component='section'
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 3
                    }}>

                    <Autocomplete
                        component='input'
                        id="searcg-field"
                        freeSolo
                        options={products.map(p => p.name)}
                        renderInput={params => (
                            <TextField
                                {...params} label="What are you looking for?"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '50px', // Set the desired radius here
                                        // color: 'primary.light',
                                        '&.Mui-focused fieldset': {
                                            // color: 'primary.light',
                                            borderColor: 'secondary.main', // Example: keep border color consistent
                                        },
                                    },
                                }}
                            />
                        )}
                        sx={{
                            width: '100%',
                        }}
                    />
                </Container>


                {/* {
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
                } */}
            </Box>
        </Drawer>
    );
};

export default Navbar;