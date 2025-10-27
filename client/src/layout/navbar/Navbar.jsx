import { AppBar, Box, IconButton, Link, Toolbar } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link as RouterLink } from "react-router";
import { HIDE_MOBILE } from "../../constants/breakpoints";
import { useNavbar } from "../../hooks/useNavbar.js";

import { underlineHoverEffect } from '../../styles/common'
import { NAV_FEATURES, NAV_LINKS } from "./navConfig.js";

const Navbar = () => {
    const { activeMenu, toggleMenu, isMenuOpen } = useNavbar();

    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const getProducts = async () => {
    //         fetchAll()
    //             .then(products => {
    //                 console.log(products);

    //             })
    //             .catch(err => {
    //                 console.log('ERROR' + err);
    //             })
    //     };

    //     getProducts();
    // }, []);

    return (
        <AppBar
            sx={{ position: 'static', backgroundColor: 'white' }}
            component='nav'
            role="navigation"
            aria-label="Main navigation"
        >
            <Toolbar sx={{
                justifyContent: { xs: "space-between", xl: 'space-evenly' },
            }}>

                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    gap: 5,
                }}>
                    <IconButton
                        component={RouterLink}
                        to='/'
                        aria-label="Go to homepage"
                    >
                        <HomeRoundedIcon fontSize="large" />
                    </IconButton>

                    <Box
                        sx={{
                            display: HIDE_MOBILE,
                            gap: 5,
                            alignItems: 'center',
                        }}
                        component='nav'
                        aria-label="Primary navigation"
                    >
                        {NAV_LINKS.map(link => (
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
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: 'center'
                    }}
                    role='toolbar'
                    aria-label="Navigation tools"
                >
                    {NAV_FEATURES.map(x => (
                        <x.Icon
                            key={`icon-${x.id}`}
                            open={isMenuOpen(x.id)}
                            toggle={() => toggleMenu(x.id)}
                            aria-expanded={isMenuOpen(x.id)}
                            aria-controls={`menu-${x.id}`}
                            {...x.iconProps}
                        />
                    ))}
                </Box>

                {/* Nav Menus */}
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
                    role='region'
                    aria-label='Navigation menus'
                >
                    {NAV_FEATURES.map(x => {
                        // const isOpen = isMenuOpen(x.id);
                        // if (!isOpen) return null;

                        return <x.Menu
                            id={`menu-${x.id}`}
                            key={`menu-${x.id}`}
                            open={isMenuOpen(x.id)}
                            toggle={() => toggleMenu(x.id)}
                            aria-hidden={isMenuOpen(x.id)}
                            {...x.menuProps}
                        />
                    })}
                </Box>
            </Toolbar>

        </AppBar >
    );
};

export default Navbar;