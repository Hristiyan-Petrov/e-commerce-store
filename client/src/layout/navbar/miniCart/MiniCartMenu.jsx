import {
    Container,
    Stack,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';

import TopDrawerMenu from '../../../components/common/TopDrawerMenu';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { useCart } from '../../../context/CartContext';
import CartItemList from './components/CartItemList';
import EmtyCart from './components/EmptyCart';
import CartSummary from './components/CartSummary';

export default function MiniCartMenu({
    open,
    toggle,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
}) {
    useLockBodyScroll(open);

    const {
        cartItems,
        summary,
        loading,
        error,
    } = useCart();

    return (
        <TopDrawerMenu
            open={open}
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
            {...props}
        >
            <Stack
                py={3}
                component="section"
                sx={{
                    backgroundColor: 'secondary.light',
                    // maxHeight: 'calc(100vh - 56px)',
                    overflowY: 'auto',
                    height: 'calc(100vh - 56px)',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Loading State */}
                {loading && (
                    <Container sx={{ textAlign: 'center', py: 4 }}>
                        <CircularProgress />
                        <Typography sx={{ mt: 2 }}>Loading cart...</Typography>
                    </Container>
                )}

                {/* Error State */}
                {error && (
                    <Container>
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    </Container>
                )}

                {/* Empty Cart */}
                {!loading && cartItems.length === 0 && (
                    <EmtyCart toggle={toggle} />
                )}

                {/* Cart Items */}
                {!loading && cartItems.length > 0 && (
                    <Stack
                        component="section"
                        mx={3}
                        sx={{
                            flexDirection: { sm: 'row' },
                            gap: { sm: 2 },
                            justifyContent: { sm: 'space-between' },
                            alignItems: { sm: 'flex-start' },
                            m: { lg: '0 auto' },
                            minWidth: { lg: '75%', xl: '70%' },
                        }}
                    >
                        {/* Cart Items List */}
                        <CartItemList
                            items={cartItems}
                            toggle={toggle}
                        />

                        {/* Summary */}
                        <CartSummary
                            summary={summary}
                            toggle={toggle}
                        />
                    </Stack>
                )}
            </Stack>
        </TopDrawerMenu>
    );
};