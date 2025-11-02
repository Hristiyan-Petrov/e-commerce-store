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
} from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const ProductCard = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Defensive destructuring with default values
    const {
        id,
        name = 'Untitled Product',
        price = 0,
        salePrice,
        imageUrl
    } = product;

    // Ensure prices are numbers
    const displayPrice = Number(price);
    const displaySalePrice = salePrice ? Number(salePrice) : null;
    const hasSale = displaySalePrice && displaySalePrice < displayPrice;

    // Helper function for clean formatting
    const formatPrice = (value) => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            return '$--.--';
        }
        return `$${numericValue.toFixed(2)}`;
    };

    const handleAddToCart = async (e) => {
        e.preventDefault(); // Prevent card click
        e.stopPropagation();

        setIsAdding(true);
        setShowError(false);

        try {
            await addToCart(id, 1, product);
            setShowSuccess(true);
        } catch (error) {
            console.error('Failed to add to cart:', error);
            setErrorMessage(error.message || 'Failed to add item to cart');
            setShowError(true);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea
                    sx={{ flexGrow: 1 }}
                    onClick={() => navigate(`/shop/${id}`)}
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
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ minHeight: '3.8em' }}
                        >
                            {name}
                        </Typography>
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
                            <IconButton
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                sx={{
                                    backgroundColor: 'secondary.light',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: 'action.disabledBackground',
                                    },
                                }}
                            >
                                {isAdding ? (
                                    <CircularProgress size={24} />
                                ) : showSuccess ? (
                                    <CheckCircleIcon color="success" />
                                ) : (
                                    <AddShoppingCartRoundedIcon />
                                )}
                            </IconButton>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={2000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    variant="filled"
                >
                    Added to cart!
                </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar
                open={showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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