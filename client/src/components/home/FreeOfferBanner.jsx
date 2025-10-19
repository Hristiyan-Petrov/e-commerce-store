import { Box, Typography } from "@mui/material";

export default function FreeOfferBanner() {
    return (
        <Box sx={{
            backgroundColor: 'primary.light',
            textAlign: 'center',
            py: 1,
            px: 3,
        }}>
            <Typography sx={{
                fontWeight: '800',
                fontSize: '0.9rem'
            }}>
                Free* Deskmat with every Mouse + Keyboard in Cart
            </Typography>
        </Box>
    )
};