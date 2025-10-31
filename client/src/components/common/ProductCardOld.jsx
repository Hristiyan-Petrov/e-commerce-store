// src/components/common/ProductCard.jsx
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  IconButton,
} from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

const ProductCard = ({ product }) => {
  // Defensive destructuring with default values
  const { name = 'Untitled Product', price = 0, salePrice, imageUrl } = product;

  // Ensure prices are numbers before performing calculations/methods
  const displayPrice = Number(price);
  const displaySalePrice = salePrice ? Number(salePrice) : null;

  const hasSale = displaySalePrice && displaySalePrice < displayPrice;

  // Helper function for clean formatting
  const formatPrice = (value) => {
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      return '$--.--'; // Return a placeholder if value is not a number
    }
    return `$${numericValue.toFixed(2)}`;
  };


  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea sx={{ flexGrow: 1 }}>
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
          <Typography gutterBottom variant="h6" component="div" sx={{ minHeight: '3.8em' }}>
            {name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              '& > :last-child': {
                marginLeft: 'auto'
              }
            }}
          >
            <Typography
              variant="h6"
              color={hasSale ? 'red' : 'text.primary'}
            >
              {/* USE THE HELPER FUNCTION */}
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
            <IconButton sx={{
              backgroundColor: 'secondary.light',
              '&:hover': {
                backgroundColor: 'primary.light',
              }
            }}>
              <AddShoppingCartRoundedIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;