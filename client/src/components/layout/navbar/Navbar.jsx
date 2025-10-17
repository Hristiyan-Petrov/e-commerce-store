import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router";
import { useState } from "react";
import AccountMenuItem from "./AccountMenuItem";

const Navbar = () => {
    return (
        <AppBar sx={{position: 'static'}}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton color="secondary" aria-label="mini shopping cart">
                        <HomeIcon fontSize="large" />
                    </IconButton>

                <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <Button variant="contained" color="secondary" component={Link} to="/products">Products</Button>
                    <AccountMenuItem />
                </Box>
                {/* <Box sx={{ display: 'flex', gap: 3 }}> */}
                    <IconButton color="secondary" aria-label="mini shopping cart">
                        <ShoppingCartIcon fontSize="large" />
                    </IconButton>
                {/* </Box> */}
            </Toolbar>
        </AppBar >
    );
};

export default Navbar;