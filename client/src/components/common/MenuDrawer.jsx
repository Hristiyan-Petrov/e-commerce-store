import { Drawer, Box, IconButton, Typography, styled } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'drawerWidth'
})(({ theme, anchor, drawerWidth }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        // Logic: If Right/Left, use fixed width on desktop. If Top/Bottom, auto height.
        ...(anchor === 'left' || anchor === 'right' ? {
            maxWidth: drawerWidth || '450px',
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth || '450px',
            }
        } : {
            height: 'auto',
            maxHeight: '80vh'
        })
    },
}));

export default function AppDrawer({
    open,
    toggle,
    title,
    anchor = 'right', // Default to right
    footer,
    children,
    width, // Optional custom width
    showCloseIcon = true,
    headerSx = {},
    paperSx = {},
    zIndex,
    ...props
}) {
    return (
        <StyledDrawer
            anchor={anchor}
            open={open}
            onClose={toggle}
            drawerWidth={width}
            PaperProps={{ sx: paperSx }}
            sx={{
                zIndex: zIndex,
                ...props.sx
            }}
            {...props}
        >
            {/* Header - Only render if title or close icon exists */}
            {(title || showCloseIcon) && (
                <Box sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    ...headerSx
                }}>
                    {title && (
                        <Typography variant="h6" fontWeight="bold">
                            {title}
                        </Typography>
                    )}
                    
                    {showCloseIcon && (
                        <IconButton onClick={toggle} aria-label="close">
                            <CloseRoundedIcon />
                        </IconButton>
                    )}
                </Box>
            )}

            {/* Scrollable Content */}
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                {children}
            </Box>

            {/* Fixed Footer */}
            {footer && (
                <Box sx={{
                    p: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    zIndex: 1
                }}>
                    {footer}
                </Box>
            )}
        </StyledDrawer>
    );
};