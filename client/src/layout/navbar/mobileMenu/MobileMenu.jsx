import { Box, ListItemButton } from "@mui/material";
import { Link as RouterLink } from "react-router";

import TopDrawerMenu from "../../../components/common/TopDrawerMenu";
import { useCloseOnScroll } from "../../../hooks/useCloseOnScroll";

const navigationLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Software', to: '/software' },
    { label: 'Deals', to: '/shop/deals' },
];

export default function MobileMenu({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
}) {
    useCloseOnScroll(open, toggle);

    return (
        <TopDrawerMenu
            key='mobile-menu'
            open={open}
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            {...props}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                {
                    navigationLinks.map(link => (
                        <ListItemButton
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
                        </ListItemButton>
                    ))
                }
            </Box>
        </TopDrawerMenu>
    );
};