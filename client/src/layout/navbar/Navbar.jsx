import { AppBar, Toolbar } from "@mui/material";
import { useNavbar } from "../../hooks/useNavbar.js";

import NavigationIcons from "./NavigationIcons.jsx";
import NavigationMenus from "./NavigationMenus.jsx";
import PrimaryNavigation from "./PrimaryNavigation.jsx";
import { useScrollDirection } from "../../hooks/useScrollDirection.js";

const Navbar = () => {
    const { activeMenu, toggleMenu, isMenuOpen } = useNavbar();
    const scrollDirection = useScrollDirection();

    return (
        <AppBar
            sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.3s',
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