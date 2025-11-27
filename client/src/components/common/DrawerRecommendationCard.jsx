import { Box, Typography, Stack, IconButton, CircularProgress, Fade } from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useState } from 'react';

export default function DrawerRecommendationCard({ product, onAdd }) {
    const [status, setStatus] = useState('idle'); // 'idle' / 'loading' / 'addes'

    const handleAdd = async () => {
        setStatus('loading');
        try {
            await onAdd(product.id, 1, product, { silent: true });
            setStatus('added');
        } catch (error) {
            console.log(error);
            setStatus('idle');
        }
    };

    const isAdded = status === 'added';
    const isLoading = status === 'loading';

    return (
        <Box sx={{ width: '100%' }}>
            {/* Image Container */}
            <Box
                sx={{
                    position: 'relative',
                    paddingTop: '100%', // 1:1 Aspect Ratio
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                    overflow: 'hidden',
                    // Dim the image when loading
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'opacity 0.2s'
                }}
            >
                <Box
                    component="img"
                    src={product.imageUrl}
                    alt={product.name}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        // Blur effect slightly on load
                        filter: isLoading ? 'grayscale(50%) blur(1px)' : 'none',
                        transition: 'filter 0.3, transform 0.3s',
                        '&:hover': {
                            transform: !isAdded && !isLoading ? 'scale(1.05)' : 'none'
                        }
                    }}
                />
                {/* Spinner */}
                <Fade
                    in={isLoading}
                    sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        display: 'flex'
                    }}
                >
                    <Box>
                        <CircularProgress />
                    </Box>
                </Fade>

                {/* Quick Add Button Overlay */}
                <IconButton
                    onClick={handleAdd}
                    disabled={isLoading || isAdded}
                    size="small"
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: isAdded ? 'success.light' : 'white',
                        // color: isAdded ? 'success.contrastText' : 'primary.main',
                        boxShadow: 2,
                        '&:hover': {
                            bgcolor: isAdded ? 'success.light' : 'primary.main',
                            color: 'white'
                        },
                        '&.Mui-disabled': {
                            bgcolor: isAdded ? 'success.main' : 'white',
                            color: isAdded ? 'white' : 'rgba(0,0,0,0.9)'
                        }
                    }}
                >
                    {isAdded ? <CheckCircleOutlineRoundedIcon fontSize='small' /> : <AddShoppingCartRoundedIcon fontSize="small" />}
                </IconButton>
            </Box>

            {/* Details */}
            <Typography
                variant="body1"
                fontWeight={600}
            >
                {product.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                {product.salePrice ? (
                    <>
                        <Typography color="error.main" fontWeight="bold">
                            ${Number(product.salePrice).toFixed(2)}
                        </Typography>
                        <Typography sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                            ${Number(product.price).toFixed(2)}
                        </Typography>
                    </>
                ) : (
                    <Typography color="text.secondary">
                        ${Number(product.price).toFixed(2)}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};