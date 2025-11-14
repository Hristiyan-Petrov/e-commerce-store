import { Drawer } from "@mui/material";

const TopDrawerMenu = ({
    open,
    sx = {},
    paperSx = {},
    children,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
}) => {
    return (
        <Drawer
            open={open}
            anchor="top"
            variant="persistent"
            role='dialog'
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            ModalProps={{
                // disablePortal: true,
                keepMounted: false // Don't keep in the DOM when closed
            }}
            sx={{
                position: "absolute",
                width: '100%',
                ...sx
            }}
            PaperProps={{
                sx: {
                    position: 'relative',
                    borderTop: '5px solid',
                    borderTopColor: 'primary.main',
                    ...paperSx
                }
            }}
            {...props}
        >
            {children}
        </Drawer>
    );
};

export default TopDrawerMenu;