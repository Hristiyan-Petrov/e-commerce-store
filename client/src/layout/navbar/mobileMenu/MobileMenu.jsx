import { Box, ListItemButton } from "@mui/material";
import { Link as RouterLink } from "react-router";

import TopDrawerMenu from "../../../components/common/TopDrawerMenu";
import { useCloseOnScroll } from "../../../hooks/useCloseOnScroll";
import { NAV_LINKS } from "../navConfig";
import AppDrawer from "../../../components/common/MenuDrawer";

export default function MobileMenu({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
}) {
    useCloseOnScroll(open, toggle);

    return (
        <AppDrawer
            // key='mobile-menu'
            // open={open}
            // aria-label={ariaLabel}
            // aria-hidden={ariaHidden}
            // {...props}
            anchor="top"
            open={open}
            toggle={toggle}
            showCloseIcon={false}
            paperSx={{
                mt: '56px', // Offset for Navbar height
                boxShadow: 'none',
                borderTop: '5px solid',
                borderTopColor: 'primary.main'
            }}
            ModalProps={{
                keepMounted: true,
            }}
            {...props}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                {
                    NAV_LINKS.map(link => (
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
        </AppDrawer>
    );
};