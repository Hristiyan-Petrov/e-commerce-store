import { Box } from "@mui/material";
import { NAV_FEATURES } from "./navConfig";

export default function NavigationMenus({
    toggleMenu,
    isMenuOpen,
    activeMenu,
}) {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                height: 'calc(100vh - 56px)', // 56px is the default Toolbar height on mobile - only place where the mobile menu is visible
                overflow: 'hidden',
                pointerEvents: activeMenu ? 'auto' : 'none',
                width: { xs: '100%', md: 'auto' },
                background: 'transparent'
            }}
            role='region'
            aria-label='Navigation menus'
        >
            {NAV_FEATURES.map(x => (
                <x.Menu
                    id={`menu-${x.id}`}
                    key={`menu-${x.id}`}
                    open={isMenuOpen(x.id)}
                    toggle={() => toggleMenu(x.id)}
                    aria-hidden={isMenuOpen(x.id)}
                    {...x.menuProps}
                />
            ))}
        </Box>
    );
};