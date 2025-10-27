import { Box } from "@mui/material";
import { NAV_FEATURES } from "./navConfig";

export default function NavigationIcons({
    toggleMenu,
    isMenuOpen
}) {
    return (
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
    );
};