// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import NewArrivals from '../components/home/NewArrivals';
import { fetchLatestProducts } from '../api/product';

const HomePage = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchLatestProducts(5);
        setLatestProducts(data);
      } catch (err) {
        setError('Failed to fetch new products. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <Box>
      <HeroSection />
      <NewArrivals
        products={latestProducts}
        isLoading={isLoading}
        error={error}
      />
      {/* Next sections will go here */}
    </Box>
  );
};

export default HomePage;