import { Box, Button, Typography, Stack, Divider, IconButton, Avatar } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import { useCart } from '../../../../context/CartContext';
import { ROUTES } from '../../../../constants/routes';
import AppDrawer from '../../../../components/common/AppDrawer';

export default function AddedToCartDrawer({
    open,   // Receive open prop from NavigationMenus
    toggle, // Receive toggle prop from NavigationMenus
    ...props 
}) {
    const [isOpen, setIsOpen] = useState(open);
    const [lastAddedItem, setLastAddedItem] = useState(null);
    
    const { summary } = useCart();
    const navigate = useNavigate();

    // Sync internal state when parent prop changes (e.g. clicking Navbar Icon)
    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    useEffect(() => {
        const handleOpen = (e) => {
            const { newItem, product, quantity } = e.detail || {};
            
            if (newItem && product) {
                setLastAddedItem({
                    ...product,
                    quantity: quantity || 1
                });
                requestAnimationFrame(() => setIsOpen(true));
            }
        };

        window.addEventListener('openMiniCart', handleOpen);
        return () => window.removeEventListener('openMiniCart', handleOpen);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        if (toggle) toggle(); 
    };

    const handleViewCart = () => {
        handleClose();
        navigate(ROUTES.CART);
    };

    const handleCheckout = () => {
        handleClose();
        navigate(ROUTES.CHECKOUT);
    };

    const salePrice = lastAddedItem?.salePrice ? Number(lastAddedItem.salePrice) : null;
    const originalPrice = Number(lastAddedItem?.price);
    const displayPrice = salePrice !== null ? salePrice : originalPrice;
    
    const originalPriceStyle = {
        textDecoration: salePrice !== null ? 'line-through' : 'none',
        color: salePrice !== null ? 'text.secondary' : 'text.primary',
        mr: 1,
    };

    return (
        <AppDrawer
            anchor="right"
            open={isOpen}
            toggle={handleClose}
            showCloseIcon={false}
            zIndex={(theme) => theme.zIndex.drawer + 2}
        >
            {/* 1. SUCCESS HEADER */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircleOutlineRoundedIcon color="success" />
                <Typography variant="subtitle1" fontWeight="bold">
                    Added to Bag
                </Typography>
                <IconButton size="small" onClick={handleClose} sx={{ ml: 'auto' }}>
                    <CloseRoundedIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* 2. THE ADDED ITEM */}
            <Box sx={{ p: 3, overflowY: 'auto', flexGrow: 1 }}>
                {lastAddedItem && (
                    <Stack direction="row" spacing={3}> 
                        <Avatar 
                            variant="rounded" 
                            src={lastAddedItem.imageUrl} 
                            sx={{ width: 120, height: 120, bgcolor: 'action.hover' }}
                        />
                        <Box>
                            <Typography 
                                variant="subtitle1" 
                                fontWeight="bold"
                            >
                                {lastAddedItem.name}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                {salePrice !== null && (
                                    <Typography 
                                        variant="body2" 
                                        sx={originalPriceStyle}
                                    >
                                        ${originalPrice.toFixed(2)}
                                    </Typography>
                                )}
                                <Typography 
                                    variant="body2" 
                                    fontWeight="bold"
                                    color={salePrice !== null ? 'error.main' : 'text.primary'}
                                >
                                    ${displayPrice.toFixed(2)}
                                </Typography>
                            </Box>
                            
                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                mt={1} 
                            >
                                Quantity: {lastAddedItem.quantity}
                            </Typography>
                        </Box>
                    </Stack>
                )}
            </Box>

            <Divider />

            {/* 3. SUMMARY FOOTER */}
            <Box 
                sx={{ 
                    p: 3, 
                    bgcolor: 'background.default', 
                }}
            >
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1">Cart Subtotal ({summary.itemCount} items)</Typography>
                        <Typography variant="h6" fontWeight="bold">${summary.subtotal.toFixed(2)}</Typography>
                    </Box>
                    
                    <Typography variant="caption" color="text.secondary">
                        Shipping & taxes calculated at checkout.
                    </Typography>

                    <Button 
                        variant="contained" 
                        fullWidth 
                        size="large" 
                        onClick={handleCheckout}
                    >
                        Checkout
                    </Button>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        size="large" 
                        onClick={handleViewCart}
                        sx={{
                            backgroundColor: 'secondary.main',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                            }
                        }}
                    >
                        View Cart ({summary.totalQuantity})
                    </Button>
                </Stack>
            </Box>
        </AppDrawer>
    );
}