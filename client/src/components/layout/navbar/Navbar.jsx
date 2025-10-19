import { AppBar, Box, Button, Chip, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; import { Link as RouterLink } from "react-router";
import AccountMenuItem from "./AccountMenuItem";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { HIDE_MOBILE, SHOW_MD_UP, SHOW_MOBILE_ONLY, SHOW_UP_MD } from "../../../constants/breakpoints";

const navigationLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Software', to: '/software' },
    { label: 'Deals', to: '/shop/deals' },
];

const Navbar = () => {
    const handleSearch = () => {
        console.log('You clicked search.');
    };
    return (
        <AppBar sx={{ position: 'static', backgroundColor: 'white' }}>
            <Toolbar sx={{
                justifyContent: {xs: "space-between", xl: 'space-evenly'},
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

                <AccountMenuItem />
                <IconButton aria-label="mini shopping cart">
                    <ShoppingCartOutlinedIcon />
                </IconButton>
                <IconButton aria-label="mobile menu" sx={{
                    display: SHOW_MOBILE_ONLY
                }}>
                    <MenuIcon />
                </IconButton>
            </Box>
        </Toolbar>
        </AppBar >
    );
};

export default Navbar;