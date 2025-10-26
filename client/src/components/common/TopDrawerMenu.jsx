import { Drawer } from "@mui/material";

const TopDrawerMenu = ({
    open,
    sx = {},
    children
}) => {
    return (
        <Drawer
            open={open}
            anchor="top"
            variant="persistent"
            ModalProps={{
                disablePortal: true,
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
                }
            }}
        >
            {children}
        </Drawer>
    );
};

export default TopDrawerMenu;