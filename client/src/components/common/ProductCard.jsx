import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Stack,
    Box,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { motion } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';


import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { pushToDataLayer } from '../../utils/dataLayer';
import { ANALYTICS_EVENTS } from '../../constants/analytics';

const ProductCard = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        id,
        name = 'Untitled Product',
        price = 0,
        salePrice,
        imageUrl
    } = product;

    const displayPrice = Number(price);
    const displaySalePrice = salePrice ? Number(salePrice) : null;
    const hasSale = displaySalePrice && displaySalePrice < displayPrice;

    const formatPrice = (value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            return '$--.--';
        }
        return `$${numericValue.toFixed(2)}`;
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isAdding) return;

        setIsAdding(true);
        setShowError(false);
        try {
            await addToCart(id, 1, product);
            setShowSuccess(true);

            // Track event
            pushToDataLayer(ANALYTICS_EVENTS.CART.ADD_TO_CART, {
                user_status: user ? 'logged_in' : 'guest',
                ecommerce: {
                    currency: 'USD',
                    value: hasSale ? displaySalePrice : displayPrice,
                    items: [{
                        item_id: String(id),
                        item_name: name,
                        price: hasSale ? displaySalePrice : displayPrice,
                        quantity: 1,
                        discount: hasSale ? displayPrice - displaySalePrice : 0
                    }]
                }
            });
        } catch (error) {
            console.error('Failed to add to cart:', error);
            setErrorMessage(error.message || 'Failed to add item to cart');
            setShowError(true);
        } finally {
            setIsAdding(false);
        }
    };

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const responsiveAnchor = isDesktop
        ? { vertical: 'bottom', horizontal: 'right' }
        : { vertical: 'bottom', horizontal: 'center' };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5, y: -10 }
    };

    const centeringStyles = {
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
    };

    return (
        <>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Part 1: Clickable area for navigation */}
                <CardActionArea
                    onClick={() => navigate(`/shop/${id}`)}
                    sx={{ flexGrow: 1 }}
                >
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={name}
                        sx={{
                            height: 220,
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ minHeight: '3.8em' }}
                        >
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                {/* Part 2: Actions area (price and add to cart button) */}
                <CardContent>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            '& > :last-child': {
                                marginLeft: 'auto',
                            },
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                color={hasSale ? 'red' : 'text.primary'}
                            >
                                {hasSale ? formatPrice(displaySalePrice) : formatPrice(displayPrice)}
                            </Typography>
                            {hasSale && (
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ textDecoration: 'line-through' }}
                                >
                                    {formatPrice(displayPrice)}
                                </Typography>
                            )}
                        </Box>

                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                        >
                            <IconButton
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                sx={{
                                    backgroundColor: 'secondary.light',
                                    width: 40,
                                    height: 40,
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: 'action.disabledBackground',
                                    },
                                }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isAdding ? (
                                        <motion.div
                                            key="loader"
                                            style={centeringStyles}
                                            variants={iconVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                            <CircularProgress size={24} />
                                        </motion.div>
                                    ) : showSuccess ? (
                                        <motion.div
                                            key="success"
                                            style={centeringStyles}
                                            variants={iconVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                            <CheckCircleIcon color="success" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="cart"
                                            style={centeringStyles}
                                            variants={iconVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                            <AddShoppingCartRoundedIcon />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* {isAdding ? (
                                    <CircularProgress size={24} />
                                ) : showSuccess ? (
                                    <CheckCircleIcon color="success" />
                                ) : (
                                    <AddShoppingCartRoundedIcon />
                                )} */}
                            </IconButton>
                        </motion.div>
                    </Stack>
                </CardContent>
            </Card>

            {/* Snackbars */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={2000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={responsiveAnchor}
            >
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    variant="filled"
                >
                    Added to cart!
                </Alert>
            </Snackbar>

            <Snackbar
                open={showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
                anchorOrigin={responsiveAnchor}
            >
                <Alert
                    onClose={() => setShowError(false)}
                    severity="error"
                    variant="filled"
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProductCard;