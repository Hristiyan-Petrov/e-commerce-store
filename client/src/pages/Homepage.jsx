import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
// import NewArrivals from '../components/home/NewArrivals';
import { fetchLatestProducts } from '../api/product';
import FreeOfferBanner from '../components/home/FreeOfferBanner';

const HomePage = () => {
  // const [latestProducts, setLatestProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);
  //       const data = await fetchLatestProducts(5);
  //       setLatestProducts(data);
  //     } catch (err) {
  //       setError('Failed to fetch new products. Please try again later.');
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getProducts();
  // }, []);

  return (
    <>
      {/* <HeroSection/> */}
      {/* <NewArrivals
        products={latestProducts}
        isLoading={isLoading}
        error={error}
      /> */}
      <FreeOfferBanner/>
    </>
  );
};

export default HomePage;