import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router";

export default function AccountMenuItem() {
    const navigate = useNavigate();
    const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
    const closeMenu = () => setAccountMenuAnchor(null);
    const accountMenuItems = [
        { label: 'Profile', to: '/profile' },
        { label: 'Settings', to: '/settings' },
        { label: 'Logout', to: '#' },
    ];

    return (
        <>
            <IconButton
                color="secondary"
                aria-label="personal account"
                onClick={e => setAccountMenuAnchor(e.currentTarget)}
            >
                <PersonIcon fontSize="large" />
            </IconButton>
            <Menu
                anchorEl={accountMenuAnchor}
                open={Boolean(accountMenuAnchor)}
                onClose={closeMenu}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                {accountMenuItems.map(item => (
                    <MenuItem key={item.label} onClick={() => {
                        navigate(item.to);
                        closeMenu();
                    }}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};