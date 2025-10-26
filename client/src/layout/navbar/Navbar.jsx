import { AppBar, Autocomplete, Avatar, Badge, Box, Button, Chip, Container, Drawer, IconButton, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link as RouterLink } from "react-router";
import { HIDE_MOBILE, SHOW_MD_DOWN, SHOW_MD_UP, SHOW_MOBILE_ONLY } from "../../constants/breakpoints";
import { useEffect, useState } from "react";
import { fetchAll } from '../../api/product';
import { underlineHoverEffect } from '../../styles/common'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import MobileMenu from "./mobileMenu/MobileMenu.jsx";
import NavigationIcons from "./NavigationIcons.jsx";
import AccountIcon from "./account/AccountIcon.jsx";
import AccountMenu from "./account/AccountMenu.jsx";
import MobileMenuIcon from "./mobileMenu/MobileMenuIcon.jsx";
import MiniCartMenu from "./miniCart/MiniCartMenu.jsx";
import MiniCartIcon from "./miniCart/MiniCartIcon.jsx";
import SearchMenuIcon from "./search/SearchMenuIcon.jsx";
import SearchMenu from "./search/SearchMenu.jsx";
import { useNavbar } from "../../hooks/useNavbar.js";

const navigationLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Software', to: '/software' },
    { label: 'Deals', to: '/shop/deals' },
];

const NAV_FEATURES = [
    { id: 'search', Icon: SearchMenuIcon, Menu: SearchMenu },
    { id: 'account', Icon: AccountIcon, Menu: AccountMenu },
    { id: 'miniCart', Icon: MiniCartIcon, Menu: MiniCartMenu },
    { id: 'mobile', Icon: MobileMenuIcon, Menu: MobileMenu },
];

const Navbar = () => {
    const [products, setProducts] = useState([]);

    // const [activeMenu, setActiveMenu] = useState(null);
    // const handleMenuToggle = (menuName) => {
    //     console.log(menuName);
    //     setActiveMenu(prevMenu => prevMenu === menuName ? null : menuName);
    // }

    const { activeMenu, toggleMenu, isMenuOpen } = useNavbar();

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
                    <IconButton aria-label="home logo">
                        <HomeRoundedIcon fontSize="large" />
                    </IconButton>

                    <Box
                        sx={{
                            display: HIDE_MOBILE,
                            gap: 5,
                            alignItems: 'center',
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
                                    ...underlineHoverEffect()
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Box>
                </Box>

                {/* Nav Icons */}
                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: 'center'
                }}>
                    {NAV_FEATURES.map(x => (
                        <x.Icon
                            key={x.id}
                            open={isMenuOpen(x.id)}
                            toggle={() => toggleMenu(x.id)}
                        />
                    ))}
                </Box>

                {/* Menus */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        height: 'calc(100vh - 56px)', // 56px is the default Toolbar height on mobile - only place where the mobile menu is visible
                        overflow: 'hidden',
                        pointerEvents: activeMenu ? 'auto' : 'none',
                    }}
                >
                    {NAV_FEATURES.map(x => (
                        <x.Menu
                            key={x.id}
                            open={isMenuOpen(x.id)}
                            toggle={() => toggleMenu(x.id)}
                        />
                    ))}
                </Box>
            </Toolbar>

        </AppBar >
    );
};

export default Navbar;