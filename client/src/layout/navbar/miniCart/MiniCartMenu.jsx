import {
    Container,
    Stack,
    Typography,
    CircularProgress,
    Alert,
    Box,
    Collapse,
} from '@mui/material';

import TopDrawerMenu from '../../../components/common/TopDrawerMenu';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { useCart } from '../../../context/CartContext';
import CartItemList from './components/CartItemList';
import EmptyCart from './components/EmptyCart';
import CartSummary from './components/CartSummary';
import { useNavigate } from 'react-router';
import RightDrawerMenu from '../../../components/common/RightDrawerMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

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
    const { cartItems, summary, loading, error } = useCart();
    const navigate = useNavigate();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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

    const handleCheckout = () => {
        toggle();
        navigate(ROUTES.CHECKOUT);
    };

    const handleViewCart = () => {
        toggle();
        navigate(ROUTES.CART || '/cart');
    };

    const FooterContent = cartItems.length > 0 ? (
        <CartSummary
            summary={summary}
            toggle={toggle}
            onCheckout={handleCheckout}
            onViewCart={handleViewCart}
            isMiniCart={true}
        />
    ) : null;


    return (
        <RightDrawerMenu
            open={open}
            toggle={toggle}
            title={`Your Cart (${summary.totalQuantity})`}
            footer={!loading && FooterContent}
            {...props}
        >
            <Collapse in={showSuccessAlert}>
                <Alert
                    icon={<CheckCircleOutlineRoundedIcon fontSize="inherit" />}
                    severity="success"
                    sx={{
                        m: 2,
                        borderRadius: 2,
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: 'success.light'
                    }}
                >
                    Item added to your cart!
                </Alert>
            </Collapse>
            
            {/* Loading State */}
            {loading && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CircularProgress />
                    <Typography sx={{ mt: 2 }}>Loading cart...</Typography>
                </Box>
            )}

            {/* Error State */}
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
                        <CartItemList items={cartItems} toggle={toggle} />
                    </motion.div>
                )}
            </AnimatePresence>

        </RightDrawerMenu>
    );
};
//     useLockBodyScroll(open);

//     const {
//         cartItems,
//         summary,
//         loading,
//         error,
//     } = useCart();

//     return (
//         <TopDrawerMenu
//             open={open}
//             aria-label={ariaLabel}
//             aria-hidden={ariaHidden}
//             {...props}
//         >
//             <Stack
//                 py={3}
//                 component="section"
//                 sx={{
//                     backgroundColor: 'secondary.light',
//                     // maxHeight: 'calc(100vh - 56px)',
//                     overflowY: 'auto',
//                     height: 'calc(100vh - 56px)',
//                     display: 'flex',
//                     flexDirection: 'column',
//                 }}
//             >
//                 {/* Loading State */}
//                 {loading && (
//                     <Container sx={{ textAlign: 'center', py: 4 }}>
//                         <CircularProgress />
//                         <Typography sx={{ mt: 2 }}>Loading cart...</Typography>
//                     </Container>
//                 )}

//                 {/* Error State */}
//                 {error && (
//                     <Container>
//                         <Alert severity="error" sx={{ mb: 2 }}>
//                             {error}
//                         </Alert>
//                     </Container>
//                 )}

//                 {/* Empty Cart */}
//                 {!loading && cartItems.length === 0 && (
//                     <EmtyCart toggle={toggle} />
//                 )}

//                 {/* Cart Items */}
//                 {!loading && cartItems.length > 0 && (
//                     <Stack
//                         component="section"
//                         mx={3}
//                         sx={{
//                             flexDirection: { sm: 'row' },
//                             gap: { sm: 2 },
//                             justifyContent: { sm: 'space-between' },
//                             alignItems: { sm: 'flex-start' },
//                             m: { lg: '0 auto' },
//                             minWidth: { lg: '75%', xl: '70%' },
//                         }}
//                     >
//                         {/* Cart Items List */}
//                         <CartItemList
//                             items={cartItems}
//                             toggle={toggle}
//                         />

//                         {/* Summary */}
//                         <CartSummary
//                             summary={summary}
//                             toggle={toggle}
//                         />
//                     </Stack>
//                 )}
//             </Stack>
//         </TopDrawerMenu>
//     );
// };