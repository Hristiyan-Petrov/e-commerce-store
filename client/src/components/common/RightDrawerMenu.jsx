import { Drawer, Box, IconButton, Typography, styled } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '100%',
        maxWidth: '450px',
        [theme.breakpoints.up('sm')]: {
            width: '450px',
        }
    },
}));

export default function RightDrawerMenu({
    open,
    toggle,
    title,
    footer,
    children,
    ...props
}) {
    return (
        <StyledDrawer
            anchor="right"
            open={open}
            onClose={toggle}
            {...props}
        >
            {/* Header */}
            <Box sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider'
            }}>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <IconButton onClick={toggle}>
                    <CloseRoundedIcon />
                </IconButton>
            </Box>

            {/* Scrollable Content */}
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column'
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