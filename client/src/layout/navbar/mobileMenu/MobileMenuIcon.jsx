import { Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import NavIcon from "../../../components/common/NavIcon";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { SHOW_MOBILE_ONLY } from "../../../constants/breakpoints";

export default function MobileMenuIcon({ open, toggle }) {
    return (
        <NavIcon
            toggle={toggle}
            sx={{
                display: SHOW_MOBILE_ONLY
            }}
        >

            <Box sx={{
                width: 24,
                height: 24,
            }}>
                <MenuIcon sx={{
                    position: 'absolute',
                    transition: 'transform 0.3s, opacity 0.2s',
                    // When menu is open, rotate and fade out
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    opacity: open ? 0 : 1,
                }} />
                <CloseRoundedIcon sx={{
                    transition: 'transform 0.3s, opacity 0.2s',
                    // When menu is open, rotate in and fade in
                    transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
                    opacity: open ? 1 : 0,
                }} />
            </Box>
        </NavIcon>
    );
};