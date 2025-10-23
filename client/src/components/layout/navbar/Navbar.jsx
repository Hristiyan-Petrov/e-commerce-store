import { AppBar, Autocomplete, Avatar, Badge, Box, Button, Chip, Container, Drawer, IconButton, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from "react-router";
import AccountMenuItem from "./AccountMenuItem";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LocalOffer from '@mui/icons-material/LocalOffer';
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
        setMiniCartOpen(false);
    };

    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const toggleAcountMenu = () => {
        setAccountMenuOpen(prevState => !prevState);
        setMobileMenuOpen(false);
        setSearchMenuOpen(false);
        setMiniCartOpen(false);
    };

    const [searchMenuOpen, setSearchMenuOpen] = useState(false);
    const toggleSearchMenu = () => {
        setSearchMenuOpen(prevState => !prevState);
        setMobileMenuOpen(false);
        setAccountMenuOpen(false);
        setMiniCartOpen(false);
    };

    const [miniCartOpen, setMiniCartOpen] = useState(false);
    const toggleMiniCart = () => {
        setMiniCartOpen(prevState => !prevState);
        setMobileMenuOpen(false);
        setAccountMenuOpen(false);
        setSearchMenuOpen(false);
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
                            },
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: '2.25rem',
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
                        onClick={toggleSearchMenu}
                        icon={searchMenuOpen ? <SearchOffIcon /> : <SearchOutlinedIcon />}
                    />

                    <SearchMenuIcon open={searchMenuOpen} toggleMenu={toggleSearchMenu} />

                    <AccountMenuIcon open={accountMenuOpen} toggleMenu={toggleAcountMenu} />

                    <MiniCartIcon open={miniCartOpen} toggle={toggleMiniCart} />

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
                        pointerEvents: mobileMenuOpen || accountMenuOpen || searchMenuOpen || miniCartOpen ? 'auto' : 'none',
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
                    <MiniCartMenu
                        open={miniCartOpen}
                        toggle={toggleMiniCart}
                    />
                </Box>
            </Toolbar>

        </AppBar >
    );
};

const MobileMenuIcon = ({ open, toggleMenu }) => {
    return (
        <IconButton
            disableRipple
            aria-label="mobile menu"
            sx={{
                display: SHOW_MOBILE_ONLY,
                position: 'relative',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '2.5rem',
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
            disableRipple
            aria-label="account icon"
            onClick={toggleMenu}
            sx={{
                position: 'relative',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '2.5rem',
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
            disableRipple
            sx={{
                display: SHOW_MOBILE_ONLY,
                color: 'secondary.main',
                position: 'relative',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '2.5rem',
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
                width: '100%',

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
                    height: '100vh'
                }}>
                <Container
                    component='section'
                    sx={{
                        m: { md: '0 auto' },
                        maxWidth: { md: '75%', lg: '50%' },
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
                                        // '& .MuiSvgIcon-root': {
                                        //     opacity: 1,
                                        //     transition: 'opacity 0.2s'
                                        // }
                                    }
                                }}
                            >
                                <KeyboardArrowRightRoundedIcon sx={{
                                    mr: 5,
                                    // opacity: { sm: 1, lg: 0 },
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
                        maxWidth: { md: '75%', lg: '50%' },
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
            </Box>
        </Drawer>
    );
};

const MiniCartIcon = ({ open, toggle }) => {
    const miniCartItems = [
        {
            productId: '123',
            name: 'Wireless Keyboard',
            price: 79.99,
            image: 'url...',
            quantity: 2
        },
        {
            productId: '456',
            name: 'Mouse Pad',
            price: 29.99,
            image: 'url...',
            quantity: 1
        }
    ];

    return (
        <IconButton
            disableRipple
            sx={{
                color: 'secondary.main',
                position: 'relative',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '2.5rem',
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
            aria-label="mini shopping cart"
            onClick={toggle}
        >
            <Badge
                badgeContent={miniCartItems.length}
                color="primary"
                sx={{
                    '& .MuiBadge-badge': {
                        left: 10
                    }
                }}
            >
                {open
                    ? <ShoppingCartIcon />
                    : <ShoppingCartOutlinedIcon />
                }
            </Badge>
        </IconButton>
    );
};

const MiniCartMenu = ({ open, toggle }) => {
    const miniCartItems = [
        {
            id: '123',
            name: 'Wireless Keyboard',
            price: 79.99,
            image: 'url...',
            quantity: 2
        },
        {
            id: '45116',
            name: 'Mouse Pad',
            price: 29.99,
            salePrice: 19.99,
            image: 'url...',
            quantity: 2
        },
        {
            id: '1234',
            name: 'Wireless Keyboard',
            price: 79.99,
            image: 'url...',
            quantity: 2
        },
        {
            id: '4564',
            name: 'Mouse Pad',
            price: 29.99,
            image: 'url...',
            quantity: 1
        }, {
            id: '43356',
            name: 'Mouse Pad',
            price: 29.99,
            image: 'url...',
            quantity: 1
        },
        {
            id: '12e34',
            name: 'Wireless Keyboard',
            price: 79.99,
            image: 'url...',
            quantity: 2
        },
        {
            id: '4563334',
            name: 'Mouse Pad',
            price: 29.99,
            image: 'url...',
            quantity: 1
        }

    ];

    const QuantityStepper = () => (
        <Box>
        </Box>
    );

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
            <Stack
                py={3}
                component='section'
                sx={{
                    borderTopColor: 'primary.main',
                    borderTopWidth: '5px',
                    borderTopStyle: 'solid',
                    backgroundColor: 'secondary.light',
                    maxHeight: 'calc(100vh - 56px)',
                    overflowY: 'auto',
                }}
            >
                {miniCartItems.length === 0
                    ? (
                        <Container>
                            <Typography

                                sx={{
                                    letterSpacing: 1.5,
                                    textAlign: 'center'
                                }}
                            >
                                Your shopping cart is empty.
                            </Typography>
                            <Button
                                variant="contained"
                                to='/shop'
                                sx={{
                                    maxWidth: 'fit-content',
                                    fontSize: '0.8rem',
                                    letterSpacing: 2.5,
                                    px: 3
                                }}
                            >
                                Explore products
                            </Button>
                        </Container>
                    )
                    // Has items
                    : (
                        <Stack
                            component='section'
                            mx={3}
                            sx={{
                                flexDirection: { sm: 'row' },
                                gap: { sm: 2 },
                                justifyContent: { sm: "space-between" },
                                alignItems: { sm: 'flex-start' },
                                m: { lg: '0 auto' },
                                minWidth: { lg: '75%', xl: '70%' },
                            }}
                        >
                            <Box
                                component='section'
                                sx={{
                                    flex: { sm: 5 }
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        letterSpacing: 1.5,
                                        textAlign: 'center'
                                    }}
                                >
                                    Your shopping cart
                                </Typography>

                                <List>
                                    {miniCartItems.map(product => {
                                        const isOnSale = product.salePrice && product.salePrice < product.price;
                                        const finalPrice = isOnSale ? product.salePrice : product.price;
                                        const itemSubtotal = (finalPrice * product.quantity).toFixed(2);

                                        return (
                                            <ListItem
                                                key={product.id}
                                                disablePadding
                                                sx={{
                                                    my: 2,
                                                    borderRadius: 3,
                                                    backgroundColor: 'background.paper',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 2,
                                                        p: 2,
                                                        width: '100%'
                                                    }}
                                                >
                                                    <ListItemButton
                                                        to={`/shop/${product.id}`}
                                                        sx={{
                                                            maxWidth: 'fit-content',
                                                            borderRadius: 5,
                                                            '&:hover': {
                                                                backgroundColor: 'primary.light'
                                                            }
                                                        }}
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                variant="rounded"
                                                                src={product.image}
                                                                alt={product.name}
                                                            />
                                                        </ListItemAvatar>

                                                        <ListItemText
                                                            primaryTypographyProps={{ component: 'div' }}
                                                            secondaryTypographyProps={{ component: 'div' }}
                                                            primary={
                                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                                    <Typography fontWeight='bold'>{product.name}</Typography>
                                                                    {isOnSale && <LocalOffer color="primary" />}
                                                                </Stack>
                                                            }
                                                            secondary={
                                                                <Stack direction="row" spacing={1} alignItems="center">
                                                                    {isOnSale && (
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{ textDecoration: 'line-through', mr: 1 }}
                                                                        >
                                                                            ${product.price.toFixed(2)}
                                                                        </Typography>
                                                                    )}
                                                                    <Typography
                                                                        variant="body2"
                                                                        color='text.primary'
                                                                    >
                                                                        ${finalPrice.toFixed(2)}
                                                                    </Typography>
                                                                </Stack>
                                                            }
                                                        />
                                                    </ListItemButton>

                                                    {/* Section 2: Quantity Setter and Subtotal */}
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: "center",
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        {/* Quatity Setter (Omitted for brevity, assumed unchanged) */}
                                                        <Box
                                                            sx={{
                                                                borderRadius: 10,
                                                                borderColor: 'secondary.light',
                                                                borderStyle: 'solid',
                                                                borderWidth: 2,
                                                                px: 1,
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <IconButton size="small">
                                                                <RemoveOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                            <Typography variant='subtitle1'>
                                                                {product.quantity}
                                                            </Typography>
                                                            <IconButton size="small">
                                                                <AddOutlinedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>

                                                        {/* Item Subtotal Calculation */}
                                                        <Typography
                                                            variant='subtitle1'
                                                            fontWeight='bold'
                                                            color='text.primary'
                                                        >
                                                            ${itemSubtotal}
                                                        </Typography>

                                                        <IconButton>
                                                            <DeleteOutlineRoundedIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>

                            {/* Summary */}
                            <Box
                                component='section'
                                sx={{
                                    flex: { sm: 3 },
                                    position: { sm: 'sticky' },
                                    top: 0
                                }}
                            >

                                <Typography
                                    variant="h6"
                                    sx={{
                                        textAlign: 'center',
                                        letterSpacing: 1.5,
                                    }}
                                >
                                    Summary
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 3,
                                        p: 3,
                                        backgroundColor: 'background.paper',
                                        borderRadius: 3,
                                    }}>

                                    <Box
                                        sx={{
                                            // mt: 3,
                                            display: 'flex',
                                            justifyContent: "space-between"
                                        }}>

                                        <Typography>
                                            Total Savings:
                                        </Typography>
                                        <Typography

                                        >
                                            ${miniCartItems
                                                .filter(i => i.salePrice)
                                                .reduce((acc, i) => {
                                                    return acc + (i.price - i.salePrice) * i.quantity;
                                                }, 0).toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            mt: 3,
                                            display: 'flex',
                                            justifyContent: "space-between"
                                        }}>

                                        <Typography

                                        >
                                            Total:
                                        </Typography>
                                        <Typography

                                        >
                                            ${miniCartItems.reduce((acc, curr) => {
                                                const price = curr.salePrice ? curr.salePrice : curr.price;
                                                return acc + price * curr.quantity;
                                            }, 0).toFixed(2)}
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box
                                    mt={3}
                                    mb={7}
                                    sx={{
                                        px: { xs: 4, sm: 0 }
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        to="/checkout"
                                        component={RouterLink} // Use RouterLink if available
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Box>
                            </Box>

                        </Stack>
                    )}

            </Stack>
        </Drawer >
    );
};

export default Navbar;