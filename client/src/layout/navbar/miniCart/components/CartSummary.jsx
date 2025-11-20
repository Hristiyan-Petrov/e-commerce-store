import { alpha, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router';
import { ROUTES } from "../../../../constants/routes";

export default function CartSummary({
    summary,
    toggle,
    isMiniCart = false,
    disabled
}) {
    return (
        <Box component="section">
            {!isMiniCart && (
                <Typography variant="h6" sx={{ textAlign: 'center', letterSpacing: 1.5, mb: 3 }}>
                    Summary
                </Typography>
            )}

            <Box sx={{
                ...(isMiniCart ? {} : {
                    p: 3,
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                })
            }}>
                {summary.totalSavings > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Total Savings</Typography>
                            <Typography variant="body2" color="success.main" fontWeight="bold">
                                -${summary.totalSavings.toFixed(2)}
                            </Typography>
                        </Box>
                        {!isMiniCart && <Divider sx={{ my: 2 }} />}
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'baseline' }}>
                    <Typography variant={isMiniCart ? "subtitle1" : "body1"} fontWeight="bold">
                        Subtotal
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        ${summary.subtotal.toFixed(2)}
                    </Typography>
                </Box>

                {isMiniCart && (
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                        Shipping, taxes, and discount codes calculated at checkout.
                    </Typography>
                )}
            </Box>

            <Stack gap={2}>
                <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to={ROUTES.CHECKOUT}
                    onClick={toggle}
                    disabled={disabled}
                    sx={{
                        '&.Mui-disabled': {
                            // Make background 50% opacity of the used Color
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                        }
                    }}
                >
                    Checkout
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={RouterLink}
                    to={ROUTES.CART}
                    onClick={toggle}
                    disabled={disabled}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'primary.dark'
                        },
                         '&.Mui-disabled': {
                            // Make background 50% opacity of the used Color
                            backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.5),
                        }
                    }}
                >
                    View Cart
                </Button>
            </Stack>
        </Box>
    );
};