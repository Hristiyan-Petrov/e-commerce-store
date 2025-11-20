import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router';
import { useCart } from "../../../../context/CartContext";
import { ROUTES } from "../../../../constants/routes";

// export default function CartSummary({
//     summary,
//     toggle
// }) {
//     return (
//         <Box
//             component="section"
//             sx={{
//                 flex: { sm: 3 },
//                 position: { sm: 'sticky' },
//                 top: 0,
//             }}
//         >
//             <Typography
//                 variant="h6"
//                 sx={{
//                     textAlign: 'center',
//                     letterSpacing: 1.5,
//                 }}
//             >
//                 Summary
//             </Typography>
//             <Box
//                 sx={{
//                     mt: 3,
//                     p: 3,
//                     backgroundColor: 'background.paper',
//                     borderRadius: 3,
//                 }}
//             >
//                 {summary.totalSavings > 0 && (
//                     <>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                             }}
//                         >
//                             <Typography>Total Savings:</Typography>
//                             <Typography color="success.main" fontWeight="bold">
//                                 ${summary.totalSavings.toFixed(2)}
//                             </Typography>
//                         </Box>
//                         <Divider sx={{ my: 3 }} />
//                     </>
//                 )}

//                 <Box
//                     sx={{
//                         // mt: 3,
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                     }}
//                 >
//                     <Typography fontWeight="bold">Total:</Typography>
//                     <Typography fontWeight="bold">
//                         ${summary.subtotal.toFixed(2)}
//                     </Typography>
//                 </Box>
//             </Box>

//             <Box
//                 mt={3}
//                 mb={7}
//                 sx={{
//                     px: { xs: 4, sm: 0 },
//                 }}
//             >
//                 <Button
//                     variant="contained"
//                     fullWidth
//                     component={RouterLink}
//                     to={ROUTES.CHECKOUT}
//                     onClick={toggle}
//                 >
//                     Proceed to Checkout
//                 </Button>
//             </Box>
//         </Box>
//     );
// };


export default function CartSummary({
    summary,
    toggle,
    onCheckout,
    onViewCart,
    isMiniCart = false
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
                    onClick={onCheckout}
                >
                    Checkout
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={onViewCart}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'primary.dark'
                        }
                    }}
                >
                    View Cart
                </Button>
            </Stack>
        </Box>
    );
};