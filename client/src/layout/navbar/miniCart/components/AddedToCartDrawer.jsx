import { Box, Button, Typography, Stack, Divider, IconButton, Avatar, Grid, Skeleton } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import { useCart } from '../../../../context/CartContext';
import { ROUTES } from '../../../../constants/routes';
import AppDrawer from '../../../../components/common/AppDrawer';
import productApi from '../../../../api/product';
import DrawerRecommendationCard from '../../../../components/common/DrawerRecommendationCard';

export default function AddedToCartDrawer({
    open,
    toggle,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(open);
    const [lastAddedItem, setLastAddedItem] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loadingRecs, setLoadingRecs] = useState(false);

    const { summary, addToCart, cartItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    useEffect(() => {
        const handleOpen = (e) => {
            const { newItem, product, quantity } = e.detail || {};
            if (newItem && product) {
                setLastAddedItem({ ...product, quantity: quantity || 1 });
                requestAnimationFrame(() => setIsOpen(true));
            }
        };
        window.addEventListener('openMiniCart', handleOpen);
        return () => window.removeEventListener('openMiniCart', handleOpen);
    }, []);

    useEffect(() => {
        const fetchRecs = async () => {
            if (!lastAddedItem?.id) return;
            
            setLoadingRecs(true); // Start loading
            try {
                const currentCartIds = cartItems.map(item => item.product.id);
                if (!currentCartIds.includes(lastAddedItem.id)) {
                    currentCartIds.push(lastAddedItem.id);
                }
                const response = await productApi.getAddedToCartRecommendations(lastAddedItem.id, currentCartIds);
                setRecommendations(response.products || []);
            } catch (err) {
                console.error("Failed to load recommendations", err);
                // On error, we just show 0 recommendations (section collapses)
                setRecommendations([]);
            } finally {
                setLoadingRecs(false); // Stop loading
            }
        };

        if (isOpen) {
            fetchRecs();
        }
    }, [isOpen, lastAddedItem]);

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

    return (
        <AppDrawer
            anchor="right"
            open={isOpen}
            toggle={handleClose}
            showCloseIcon={false}
            zIndex={(theme) => theme.zIndex.drawer + 2}
        >
            <Box>
                {/* Header */}
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <CheckCircleOutlineRoundedIcon color="success" />
                    <Typography variant="subtitle1" fontWeight="bold">
                        Added to Bag
                    </Typography>
                    <IconButton size="small" onClick={handleClose} sx={{ ml: 'auto' }}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                </Box>

                {/* Added Item */}
                {lastAddedItem && (
                    <Box sx={{ p: 3, pb: 2 }}>
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                variant="rounded"
                                src={lastAddedItem.imageUrl}
                                sx={{ width: 80, height: 80, bgcolor: 'action.hover' }}
                            />
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                                    {lastAddedItem.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Qty: {lastAddedItem.quantity}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                    {salePrice !== null && (
                                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                            ${originalPrice.toFixed(2)}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" fontWeight="bold" color={salePrice ? 'error.main' : 'text.primary'}>
                                        ${displayPrice.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                )}

                {/* Buttons */}
                <Box sx={{ px: 3, pb: 3 }}>
                    <Stack spacing={1.5}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleCheckout}
                            sx={{ py: 1.5 }}
                        >
                            Checkout (${summary.subtotal.toFixed(2)})
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleViewCart}
                            sx={{ color: 'text.primary', borderColor: 'divider' }}
                        >
                            View Cart ({summary.totalQuantity})
                        </Button>
                    </Stack>
                </Box>
                <Divider /> 
            </Box>

            {/* Scrollable Content */}
            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                
                {/* LOADING STATE */}
                {loadingRecs ? (
                    <Box sx={{ px: 3, py: 4 }}>
                        {/* Title Skeleton */}
                        <Skeleton variant="text" width={140} height={32} sx={{ mb: 2 }} />
                        
                        <Grid container spacing={2}>
                            {[1, 2, 3, 4].map((i) => (
                                <Grid item xs={6} key={i}>
                                    {/* Image Skeleton */}
                                    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 1, mb: 1 }} />
                                    {/* Text Skeletons */}
                                    <Skeleton variant="text" width="90%" />
                                    <Skeleton variant="text" width="60%" />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    /* LOADED STATE - Only show if we have results */
                    recommendations.length > 0 && (
                        <Box sx={{ px: 3, py: 2 }}>
                            <Typography variant="subtitle1" fontWeight="800" gutterBottom sx={{ mb: 2 }}>
                                You might also like
                            </Typography>

                            <Grid container spacing={2}>
                                {recommendations.map((item) => (
                                    <Grid item xs={6} key={item.id}>
                                        <DrawerRecommendationCard
                                            product={item}
                                            onAdd={addToCart}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )
                )}
            </Box>
        </AppDrawer>
    );
}