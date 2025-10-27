import { Box, IconButton, Link } from "@mui/material";
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