import { 
    Box, 
    Container, 
    Grid, 
    Typography, 
    Breadcrumbs, 
    Link, 
    Divider,
    Button
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useCart } from "../context/CartContext";
import CartItemList from "../layout/navbar/miniCart/components/CartItemList";
import CartSummary from "../layout/navbar/miniCart/components/CartSummary";
import EmptyCart from "../layout/navbar/miniCart/components/EmptyCart";
import { ROUTES } from "../constants/routes";
import { useState } from "react";

export default function CartPage() {
    const { cartItems, summary, loading, updateQuantity, removeFromCart } = useCart();
    
    const [updatingItemIds, setUpdatingItemIds] = useState(new Set());

    const handleCartOperation = async (operation, itemId, ...args) => {
        setUpdatingItemIds(prev => new Set(prev).add(itemId));
        try {
            await operation(itemId, ...args);
        } catch (err) {
            console.error(err);
        } finally {
            setUpdatingItemIds(prev => {
                const next = new Set(prev);
                next.delete(itemId);
                return next;
            });
        }
    };

    const isGlobalBusy = updatingItemIds.size > 0;

    if (loading && cartItems.length === 0) {
        return (
            <Container sx={{ py: 8, textAlign: 'center' }}>
                <Typography>Loading your cart...</Typography>
            </Container>
        );
    }

    if (!loading && cartItems.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 8, minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <EmptyCart />
            </Container>
        );
    }

    return (
        <Box>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                
                {/* Breadcrumbs & Header */}
                <Box sx={{ mb: 4 }}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 2 }}>
                        <Link component={RouterLink} underline="hover" color="inherit" to="/">
                            Home
                        </Link>
                        <Typography color="text.primary">Shopping Cart</Typography>
                    </Breadcrumbs>
                    
                    <Typography variant="h4" component="h1" fontWeight="800" gutterBottom>
                        Your Cart
                        <Typography component="span" variant="h5" color="text.secondary" sx={{ ml: 2, fontWeight: 400 }}>
                            ({summary.totalQuantity} items)
                        </Typography>
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    
                    {/* LEFT COLUMN: Cart Items */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, overflow: 'hidden', boxShadow: 1 }}>
                          
                            <CartItemList 
                                items={cartItems}
                                toggle={null} 
                                updatingItemIds={updatingItemIds}
                                onUpdateQuantity={(id, qty) => handleCartOperation(updateQuantity, id, qty)}
                                onRemove={(id) => handleCartOperation(removeFromCart, id)}
                            />
                        </Box>
                        
                        {/* Continue Shopping Link */}
                        <Button 
                            component={RouterLink} 
                            to={ROUTES.PRODUCTS.SHOP}
                            startIcon={<ArrowBackRoundedIcon />}
                            sx={{ mt: 3, textTransform: 'none', fontWeight: 600 }}
                            color="inherit"
                        >
                            Continue Shopping
                        </Button>
                    </Grid>

                    {/* RIGHT COLUMN: Summary */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'sticky', top: 24 }}> 
                            <CartSummary 
                                summary={summary}
                                isMiniCart={false} // Tells component to use Card styling
                                disabled={isGlobalBusy}
                            />
                            
                            <Box sx={{ mt: 3, textAlign: 'center', opacity: 0.7 }}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    🔒 Secure Checkout
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    All transactions are encrypted and secured.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};