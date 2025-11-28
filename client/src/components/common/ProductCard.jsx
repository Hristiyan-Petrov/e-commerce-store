// import {
//     Card,
//     CardActionArea,
//     CardContent,
//     CardMedia,
//     Typography,
//     Stack,
//     Box,
//     IconButton,
//     CircularProgress,
//     Snackbar,
//     Alert,
//     useMediaQuery,
//     useTheme,
//     Button,
// } from '@mui/material';
// import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
// import { motion } from 'motion/react';
// import { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router';
// import IconPopTransition from './IconPopTransition';

// const ProductCard = ({ product }) => {
//     const [isAdding, setIsAdding] = useState(false);
//     const [showError, setShowError] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const { addToCart } = useCart();
//     const navigate = useNavigate();

//     const {
//         id,
//         name = 'Untitled Product',
//         price = 0,
//         salePrice,
//         imageUrl
//     } = product;

//     const displayPrice = Number(price);
//     const displaySalePrice = salePrice ? Number(salePrice) : null;
//     const hasSale = displaySalePrice && displaySalePrice < displayPrice;

//     const formatPrice = (value) => {
//         const numericValue = Number(value);
//         if (isNaN(numericValue)) {
//             return '$--.--';
//         }
//         return `$${numericValue.toFixed(2)}`;
//     };

//     const handleAddToCart = async (e) => {
//         e.stopPropagation();
//         e.preventDefault();

//         if (isAdding) return;

//         setIsAdding(true);
//         setShowError(false);
//         try {
//             await addToCart(id, 1, product);
//         } catch (error) {
//             console.error('Failed to add to cart:', error);
//             setErrorMessage(error.message || 'Failed to add item to cart');
//             setShowError(true);
//         } finally {
//             setIsAdding(false);
//         }
//     };

//     const theme = useTheme();
//     const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
//     const responsiveAnchor = isDesktop
//         ? { vertical: 'bottom', horizontal: 'right' }
//         : { vertical: 'bottom', horizontal: 'center' };

//     return (
//         <>
//             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 {/* Part 1: Clickable area for navigation */}
//                 <CardActionArea
//                     onClick={() => navigate(`/shop/${id}`)}
//                     sx={{ flexGrow: 1 }}
//                 >
//                     <CardMedia
//                         component="img"
//                         image={imageUrl}
//                         alt={name}
//                         sx={{
//                             height: 220,
//                             objectFit: 'cover',
//                             transition: 'transform 0.3s ease-in-out',
//                             '&:hover': {
//                                 transform: 'scale(1.05)',
//                             },
//                         }}
//                     />
//                     <CardContent>
//                         <Typography
//                             gutterBottom
//                             variant="h6"
//                             component="div"
//                             sx={{ minHeight: '3.8em' }}
//                         >
//                             {name}
//                         </Typography>
//                     </CardContent>
//                 </CardActionArea>

//                 {/* Part 2: Actions area (price and add to cart button) */}
//                 <CardContent>
//                     <Stack
//                         direction="row"
//                         spacing={1}
//                         alignItems="center"
//                         sx={{
//                             '& > :last-child': {
//                                 marginLeft: 'auto',
//                             },
//                         }}
//                     >
//                         <Box>
//                             <Typography
//                                 variant="h6"
//                                 color={hasSale ? 'red' : 'text.primary'}
//                             >
//                                 {hasSale ? formatPrice(displaySalePrice) : formatPrice(displayPrice)}
//                             </Typography>
//                             {hasSale && (
//                                 <Typography
//                                     variant="body1"
//                                     color="text.secondary"
//                                     sx={{ textDecoration: 'line-through' }}
//                                 >
//                                     {formatPrice(displayPrice)}
//                                 </Typography>
//                             )}
//                         </Box>

//                         <motion.div
//                             whileHover={isAdding ? {} : { scale: 1.2 }}
//                             whileTap={isAdding ? {} : { scale: 0.8 }}
//                         >
//                             <IconButton
//                                 onClick={handleAddToCart}
//                                 disabled={isAdding}
//                                 disableRipple
//                                 sx={{
//                                     backgroundColor: 'secondary.light',
//                                     width: 40,
//                                     height: 40,
//                                     '&:hover': {
//                                         backgroundColor: 'primary.light',
//                                     },
//                                     '&.Mui-disabled': {
//                                         backgroundColor: 'action.disabledBackground',
//                                     },
//                                 }}
//                             >
//                                 <IconPopTransition condition={isAdding} defaultIcon={<AddShoppingCartRoundedIcon />} alternateIcon={<CircularProgress />} />
//                             </IconButton>
//                         </motion.div>
//                     </Stack>
//                 </CardContent>
//             </Card>

//             <Snackbar
//                 open={showError}
//                 autoHideDuration={3000}
//                 onClose={() => setShowError(false)}
//                 anchorOrigin={responsiveAnchor}
//             >
//                 <Alert
//                     onClose={() => setShowError(false)}
//                     severity="error"
//                     variant="filled"
//                 >
//                     {errorMessage}
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// };

// export default ProductCard;

import { useState } from 'react';
import { Box, Typography, IconButton, Card, CardMedia, Skeleton, Chip } from '@mui/material';
import { AddShoppingCart, Check } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, loading = false }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // 1. Loading State (Skeleton)
    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 4, mb: 1.5 }} />
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="40%" height={24} />
            </Box>
        );
    }

    if (!product) return null;

    // 2. Interaction Logic
    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };

    const handleQuickAdd = async (e) => {
        e.stopPropagation(); // Stop card click
        if (isAdding) return;

        setIsAdding(true);
        try {
            await addToCart(product.id, 1, product);
            
            // Show checkmark briefly
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);
            
            // Analytics
            // trackAddToCart(product, 1, 'Quick Add - Homepage');
        } catch (err) {
            console.error(err);
        } finally {
            setIsAdding(false);
        }
    };

    // 3. Price Logic
    const isOnSale = product.salePrice && product.salePrice < product.price;
    const currentPrice = isOnSale ? product.salePrice : product.price;

    return (
        <Card
            elevation={0}
            onClick={handleCardClick}
            sx={{
                width: '100%',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'visible', // Allow hover effects to breathe
                '&:hover .product-image': {
                    transform: 'scale(1.05)',
                },
                '&:hover .quick-add-btn': {
                    opacity: 1,
                    transform: 'translateY(0)',
                }
            }}
        >
            {/* Image Container */}
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: '#F3F3F3', // Light grey background like Nike/Apple
                    borderRadius: 4,
                    mb: 2,
                    overflow: 'hidden',
                    aspectRatio: '3/4', // Taller "Fashion/Lifestyle" ratio
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Sale Badge */}
                {isOnSale && (
                    <Chip 
                        label="SALE" 
                        size="small" 
                        color="error"
                        sx={{ 
                            position: 'absolute', 
                            top: 12, 
                            left: 12, 
                            fontWeight: 800,
                            zIndex: 2
                        }} 
                    />
                )}

                <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                    sx={{
                        width: '90%',
                        height: 'auto',
                        objectFit: 'contain',
                        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                />

                {/* Quick Add Button (Slides up on hover) */}
                <IconButton
                    className="quick-add-btn"
                    onClick={handleQuickAdd}
                    disabled={isAdding}
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        backgroundColor: 'white',
                        color: isSuccess ? 'success.main' : 'black',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        opacity: 0, // Hidden by default
                        transform: 'translateY(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            color: 'white',
                        }
                    }}
                >
                    {isSuccess ? <Check /> : <AddShoppingCart />}
                </IconButton>
            </Box>

            {/* Product Info */}
            <Box>
                <Typography variant="h6" fontWeight={700} fontSize="1rem" noWrap>
                    {product.name}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                    <Typography variant="body1" fontWeight={500}>
                        ${Number(currentPrice).toFixed(2)}
                    </Typography>
                    
                    {isOnSale && (
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ textDecoration: 'line-through' }}
                        >
                            ${Number(product.price).toFixed(2)}
                        </Typography>
                    )}
                </Box>
                
                <Typography variant="caption" color="text.secondary">
                    {product.category || 'Accessories'}
                </Typography>
            </Box>
        </Card>
    );
};

export default ProductCard;