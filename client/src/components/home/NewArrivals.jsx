import {
  Box,
  Container,
  Grid,
  Typography,
  Skeleton,
  Alert,
} from '@mui/material';
import ProductCard from '../common/ProductCard';

const NewArrivals = ({ products, isLoading, error }) => {
  const renderSkeletons = () => {
    return Array.from(new Array(5)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
        <Skeleton variant="rectangular" height={220} />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Grid>
    ));
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        New Arrivals
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {isLoading
          ? renderSkeletons()
          : products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.name}>
                <ProductCard product={product} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default NewArrivals;