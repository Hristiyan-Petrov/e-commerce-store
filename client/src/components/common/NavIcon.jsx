import { alpha, IconButton, useTheme } from "@mui/material";

export default function NavIcon({
    toggle,
    sx = {},
    children
}) {
    const theme = useTheme();

    return (
        <IconButton
            onClick={toggle}
            disableRipple
            aria-label="account icon"
            sx={{
                transition: 'background-color 150ms',
                '@media (hover: hover)': {
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    },
                },
                ...sx
            }}
        >
            {children}
        </IconButton>
    );
};