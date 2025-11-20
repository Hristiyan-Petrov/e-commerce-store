import {
    Typography,
    CircularProgress,
    Alert,
    Box,
    Collapse,
    Stack,
} from '@mui/material';

import { useCart } from '../../../context/CartContext';
import CartItemList from './components/CartItemList';
import EmptyCart from './components/EmptyCart';
import CartSummary from './components/CartSummary';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AppDrawer from '../../../components/common/MenuDrawer';

const viewVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export default function MiniCartMenu({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
}) {
    const navigate = useNavigate();
    const { cartItems, summary, loading, error, updateQuantity, removeFromCart } = useCart();
    const [isUpdating, setIsUpdating] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [updatingItemIds, setUpdatingItemIds] = useState(new Set());

    useEffect(() => {
        const handleOpen = (e) => {
            if (e.detail?.newItem) {
                setShowSuccessAlert(true);
                setTimeout(() => setShowSuccessAlert(false), 4000);
            }
        };

        window.addEventListener('openMiniCart', handleOpen);
        return () => window.removeEventListener('openMiniCart', handleOpen);
    }, []);

    const handleCartOperation = async (operation, itemId, ...args) => {
        setUpdatingItemIds(prev => new Set(prev).add(itemId));

        try {
            await operation(itemId, ...args);
        } catch (err) {
            console.error(err);
        } finally {
            // Remove ID from set
            setUpdatingItemIds(prev => {
                const next = new Set(prev);
                next.delete(itemId);
                return next;
            });
        }
    };

    const isGlobalBusy = updatingItemIds.size > 0;

    const FooterContent = cartItems.length > 0 ? (
        <CartSummary
            summary={summary}
            toggle={toggle}
            isMiniCart={true}
            disabled={isGlobalBusy}
        />
    ) : null;

    return (
        <AppDrawer
            anchor="right"
            open={open}
            toggle={toggle}
            title={`Your Cart (${summary.totalQuantity})`}
            footer={!loading && FooterContent}
            zIndex={(theme) => theme.zIndex.drawer + 2}
            {...props}
        >
            <Stack
                direction="column"
                sx={{
                    height: '100%',
                    overflow: 'hidden'
                }}
            >

                <Box sx={{ flexShrink: 0, px: 2, pt: 2 }}>
                    <Collapse in={showSuccessAlert}>
                        <Alert
                            icon={<CheckCircleOutlineRoundedIcon fontSize="inherit" />}
                            sx={{
                                borderRadius: 2,
                                alignItems: 'center',
                                border: '1px solid',
                                borderColor: 'success.light'
                            }}
                        >
                            Item added to your cart!
                        </Alert>
                    </Collapse>
                </Box>

                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>

                    {/* Loading */}
                    {loading && (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <CircularProgress />
                            <Typography sx={{ mt: 2 }}>Loading cart...</Typography>
                        </Box>
                    )}

                    {/* Error */}
                    {error && (
                        <Box sx={{ p: 2 }}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    )}

                    <AnimatePresence mode="wait" initial={false}>
                        {/* Empty State */}
                        {!loading && !error && cartItems.length === 0 && (
                            <motion.div
                                key="empty-state"
                                variants={viewVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <EmptyCart toggle={toggle} />
                                </Box>
                            </motion.div>
                        )}

                        {/* Cart Items List */}
                        {!loading && cartItems.length > 0 && (
                            <motion.div
                                key="cart-list"
                                variants={viewVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <CartItemList
                                    items={cartItems}
                                    toggle={toggle}
                                    updatingItemIds={updatingItemIds}
                                    onUpdateQuantity={(id, qty) => handleCartOperation(updateQuantity, id, qty)}
                                    onRemove={(id) => handleCartOperation(removeFromCart, id)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            </Stack>
        </AppDrawer>
    );
};