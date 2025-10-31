import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import LocalOffer from '@mui/icons-material/LocalOffer';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Link as RouterLink } from 'react-router';
import { useState } from 'react';
import TopDrawerMenu from '../../../components/common/TopDrawerMenu';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { hoverBackgroundFill } from '../../../styles/common';
import { useCart } from '../../../context/CartContext';

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
        incrementQuantity,
        decrementQuantity,
        removeFromCart
    } = useCart();

    const [updatingItems, setUpdatingItems] = useState(new Set());

    const handleIncrement = async (cartItemId) => {
        setUpdatingItems(prev => new Set(prev).add(cartItemId));
        try {
            await incrementQuantity(cartItemId);
        } finally {
            setUpdatingItems(prev => {
                const next = new Set(prev);
                next.delete(cartItemId);
                return next;
            });
        }
    };

    const handleDecrement = async (cartItemId) => {
        setUpdatingItems(prev => new Set(prev).add(cartItemId));
        try {
            await decrementQuantity(cartItemId);
        } finally {
            setUpdatingItems(prev => {
                const next = new Set(prev);
                next.delete(cartItemId);
                return next;
            });
        }
    };

    const handleRemove = async (cartItemId) => {
        setUpdatingItems(prev => new Set(prev).add(cartItemId));
        try {
            await removeFromCart(cartItemId);
        } catch (err) {
            console.error('Failed to remove item:', err);
        } finally {
            setUpdatingItems(prev => {
                const next = new Set(prev);
                next.delete(cartItemId);
                return next;
            });
        }
    };

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
                    // overflowY: 'auto',

                    height: 'calc(100vh - 56px)',

                    // 2. USE FLEXBOX TO DISTRIBUTE SPACE
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
                    <Container>
                        <Typography
                            sx={{
                                letterSpacing: 1.5,
                                textAlign: 'center',
                                mb: 3,
                            }}
                        >
                            Your shopping cart is empty.
                        </Typography>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/shop"
                            onClick={toggle}
                            sx={{
                                maxWidth: 'fit-content',
                                fontSize: '0.8rem',
                                letterSpacing: 2.5,
                                px: 3,
                            }}
                        >
                            Explore products
                        </Button>
                    </Container>
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
                        <Box
                            component="section"
                            sx={{
                                flex: { sm: 5 },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                Your shopping cart
                            </Typography>

                            <List>
                                {cartItems.map((item) => {
                                    const isOnSale = item.product.salePrice &&
                                        item.product.salePrice < item.product.price;
                                    const isUpdating = updatingItems.has(item.id);

                                    return (
                                        <ListItem
                                            key={item.id}
                                            disablePadding
                                            sx={{
                                                my: 2,
                                                borderRadius: 3,
                                                backgroundColor: 'background.paper',
                                                opacity: isUpdating ? 0.6 : 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 2,
                                                    p: 2,
                                                    width: '100%',
                                                }}
                                            >
                                                {/* Product Info */}
                                                <ListItemButton
                                                    component={RouterLink}
                                                    to={`/shop/${item.product.id}`}
                                                    onClick={toggle}
                                                    sx={{
                                                        maxWidth: 'fit-content',
                                                        ...hoverBackgroundFill(),
                                                    }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            variant="rounded"
                                                            src={item.product.imageUrl}
                                                            alt={item.product.name}
                                                        />
                                                    </ListItemAvatar>

                                                    <ListItemText
                                                        primaryTypographyProps={{ component: 'div' }}
                                                        secondaryTypographyProps={{ component: 'div' }}
                                                        primary={
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                <Typography fontWeight="bold">
                                                                    {item.product.name}
                                                                </Typography>
                                                                {isOnSale && <LocalOffer color="primary" />}
                                                            </Stack>
                                                        }
                                                        secondary={
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                {isOnSale && (
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{ textDecoration: 'line-through', mr: 1 }}
                                                                    >
                                                                        ${item.product.price.toFixed(2)}
                                                                    </Typography>
                                                                )}
                                                                <Typography variant="body2" color="text.primary">
                                                                    ${item.finalPrice.toFixed(2)}
                                                                </Typography>
                                                            </Stack>
                                                        }
                                                    />
                                                </ListItemButton>

                                                {/* Quantity Controls & Subtotal */}
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    {/* Quantity Stepper */}
                                                    <Box
                                                        sx={{
                                                            borderRadius: 10,
                                                            borderColor: 'secondary.light',
                                                            borderStyle: 'solid',
                                                            borderWidth: 2,
                                                            px: 1,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDecrement(item.id)}
                                                            disabled={isUpdating || item.quantity <= 1}
                                                        >
                                                            <RemoveOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                        <Typography variant="subtitle1" sx={{ minWidth: '2ch', textAlign: 'center' }}>
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleIncrement(item.id)}
                                                            disabled={isUpdating}
                                                        >
                                                            <AddOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>

                                                    {/* Item Subtotal */}
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontWeight="bold"
                                                        color="text.primary"
                                                    >
                                                        ${item.subtotal.toFixed(2)}
                                                    </Typography>

                                                    {/* Remove Button */}
                                                    <IconButton
                                                        onClick={() => handleRemove(item.id)}
                                                        disabled={isUpdating}
                                                    >
                                                        <DeleteOutlineRoundedIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Box>

                        {/* Summary */}
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
                                        <Divider sx={{ mt: 3 }} />
                                    </>
                                )}

                                <Box
                                    sx={{
                                        mt: 3,
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
                                    to="/checkout"
                                    onClick={toggle}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Box>
                        </Box>
                    </Stack>
                )}
            </Stack>
        </TopDrawerMenu>
    );
};