import { Box, Button, Divider, Stack, Typography, TextField, InputAdornment } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Link as RouterLink } from "react-router";
import { ROUTES } from "../../../../constants/routes";

// No more 'isMiniCart' prop needed!
export default function CartSummary({
    summary,
    disabled = false
}) {
    return (
        <Box sx={{
            p: 3,
            backgroundColor: 'background.paper',
            borderRadius: 3,
            boxShadow: 1,
            position: 'sticky', // Built-in sticky since it's always sidebar
            top: 24
        }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                Order Summary
            </Typography>

            {/* PROMO CODE */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                    Promo Code
                </Typography>
                <Stack direction="row" spacing={1}>
                    <TextField
                        size="small"
                        placeholder="Enter code"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalOfferOutlinedIcon fontSize="small" color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button disabled={disabled} sx={{ backgroundColor: 'secondary.main', color: '#fff', '&:hover': { backgroundColor: 'primary.dark' } }}>
                        Apply
                    </Button>
                </Stack>
                <Divider sx={{ mt: 3 }} />
            </Box>

            {/* TOTALS */}
            <Stack spacing={2} sx={{ mb: 3 }}>
                {summary.totalSavings > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">Savings</Typography>
                        <Typography color="success.main" fontWeight="bold">
                            -${summary.totalSavings.toFixed(2)}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Subtotal</Typography>
                    <Typography variant="h6" fontWeight="bold">
                        ${summary.subtotal.toFixed(2)}
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                    Shipping & taxes calculated at checkout.
                </Typography>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Button
                variant="contained"
                fullWidth
                size="large"
                component={RouterLink}
                to={ROUTES.CHECKOUT}
                disabled={disabled}
                sx={{ borderRadius: 50, height: 48 }}
            >
                Checkout
            </Button>
        </Box>
    );
};