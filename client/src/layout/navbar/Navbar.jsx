import { AppBar, Toolbar } from "@mui/material";
import { useNavbar } from "../../hooks/useNavbar.js";

import NavigationIcons from "./NavigationIcons.jsx";
import NavigationMenus from "./NavigationMenus.jsx";
import PrimaryNavigation from "./PrimaryNavigation.jsx";
import { useScrollDirection } from "../../hooks/useScrollDirection.js";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const { activeMenu, toggleMenu, isMenuOpen } = useNavbar();
    const scrollDirection = useScrollDirection();
    const [forceVisible, setForceVisible] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const handleShowNavbar = () => {
            setForceVisible(true);
            clearTimeout(timerRef.current);

            timerRef.current = setTimeout(() => {
                setForceVisible(false);
            }, 4000); // Match add to cart success snackbar time
        };

        window.addEventListener('showNavbar', handleShowNavbar);

        return () => {
            window.removeEventListener('showNavbar', handleShowNavbar);
            clearTimeout(timerRef.current);
        };
    }, []);

    const isNavbarVisible = scrollDirection === 'up' || activeMenu || forceVisible;

    return (
        <AppBar
            sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                transform: isNavbarVisible ? 'translateY(0)' : 'translateY(-100%)',
                // transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.3s',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            component='nav'
            role="navigation"
            aria-label="Main navigation"
        >
            <Toolbar sx={{
                justifyContent: { xs: "space-between", xl: 'space-evenly' },
            }}>
                <PrimaryNavigation />
                <NavigationIcons
                    toggleMenu={toggleMenu}
                    isMenuOpen={isMenuOpen}
                />
                <NavigationMenus
                    activeMenu={activeMenu}
                    toggleMenu={toggleMenu}
                    isMenuOpen={isMenuOpen}
                />
            </Toolbar>
        </AppBar >
    );
};

export default Navbar;