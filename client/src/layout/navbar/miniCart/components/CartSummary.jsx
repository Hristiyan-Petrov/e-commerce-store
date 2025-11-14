import { Box, Button, Divider, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router';
import { useCart } from "../../../../context/CartContext";
import { ROUTES } from "../../../../constants/routes";

export default function CartSummary({
    summary,
    toggle
}) {
    return (
        <Box
            component="section"
            sx={{
                flex: { sm: 3 },
                position: { sm: 'sticky' },
                top: 0,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    letterSpacing: 1.5,
                }}
            >
                Summary
            </Typography>
            <Box
                sx={{
                    mt: 3,
                    p: 3,
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                }}
            >
                {summary.totalSavings > 0 && (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography>Total Savings:</Typography>
                            <Typography color="success.main" fontWeight="bold">
                                ${summary.totalSavings.toFixed(2)}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                    </>
                )}

                <Box
                    sx={{
                        // mt: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography fontWeight="bold">Total:</Typography>
                    <Typography fontWeight="bold">
                        ${summary.subtotal.toFixed(2)}
                    </Typography>
                </Box>
            </Box>

            <Box
                mt={3}
                mb={7}
                sx={{
                    px: { xs: 4, sm: 0 },
                }}
            >
                <Button
                    variant="contained"
                    fullWidth
                    component={RouterLink}
                    to={ROUTES.CHECKOUT}
                    onClick={toggle}
                >
                    Proceed to Checkout
                </Button>
            </Box>
        </Box>
    );
};