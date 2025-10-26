import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router";

import TopDrawerMenu from "../../../components/common/TopDrawerMenu";
import MobileMenuIcon from "./MobileMenuIcon";
import { useEffect } from "react";

const navigationLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Software', to: '/software' },
    { label: 'Deals', to: '/shop/deals' },
];

export default function MobileMenu({
    open,
    toggle,
    addMenu
}) {
    return (
        <TopDrawerMenu
            key='mobile-menu'
            open={open}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                {
                    navigationLinks.map(link => (
                        <Link
                            key={link.label}
                            to={link.to}
                            component={RouterLink}
                            onClick={toggle}
                            sx={{
                                textDecoration: 'none',
                                fontWeight: '500',
                                p: 2,
                                borderBottomWidth: '2px',
                                borderBottomStyle: 'solid',
                                borderBottomColor: 'secondary.light'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))
                }
            </Box>
        </TopDrawerMenu>
    );
};