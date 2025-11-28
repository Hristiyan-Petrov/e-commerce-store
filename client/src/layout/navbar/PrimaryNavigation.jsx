import { Box, CardMedia, IconButton, Link } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link as RouterLink } from "react-router";
import { NAV_LINKS } from "./navConfig";
import { underlineHoverEffect } from "../../styles/common";
import { HIDE_MOBILE } from "../../constants/breakpoints";

export default function PrimaryNavigation() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: "center",
                gap: 5,
            }}
            component='nav'
            aria-label="Primary navigation">
            <Box
                component={RouterLink}
                to='/'
                aria-label="Go to homepage"
                sx={{
                    display: 'flex', // Ensures no extra line-height spacing
                    textDecoration: 'none',
                    '&:hover': { opacity: 0.8, transition: '0.2s' } 
                }}
            >
                <CardMedia
                    component="img"
                    image='/assets/logo/perifix-logo.png' 
                    alt="Perifix logo"
                    sx={{
                        pr: 2,
                        transform: 'scale(1.5)',
                        height: 65, // Set height via sx for better responsiveness
                        // width: 'auto', // Maintain aspect ratio
                        // objectFit: 'contain', // Ensures logo doesn't stretch
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: HIDE_MOBILE,
                    gap: 5,
                    alignItems: 'center',
                }}

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
    );
};