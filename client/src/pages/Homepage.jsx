// import { useState, useEffect } from 'react';
// import { Box } from '@mui/material';
// // import HeroSection from '../components/home/HeroSection';
// // import NewArrivals from '../components/home/NewArrivals';
// import productApi from '../api/product';
// import FreeOfferBanner from '../components/home/FreeOfferBanner';
// import HeroSection from '../components/home/HeroSection';
// import NewArrivals from '../components/home/NewArrivals';

// const HomePage = () => {
//   const [latestProducts, setLatestProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const data = await productApi.getAll();
//         setLatestProducts(data.products);
//       } catch (err) {
//         setError('Failed to fetch new products. Please try again later.');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getProducts();
//   }, []);

//   return (
//     <>
//       {/* <HeroSection/> */}
//       <FreeOfferBanner/>
//       <NewArrivals
//         products={latestProducts}
//         isLoading={isLoading}
//         error={error}
//       />
//     </>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

// Components
import HeroVideo from '../components/home/HeroVideo';
import CategoryGrid from '../components/home/CategoryGrid';
import FeatureSpotlight from '../components/home/FeatureSpotlight';
import ProductCard from '../components/common/ProductCard';

// API
import productApi from '../api/product';

const Homepage = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await productApi.getTrending(4);
                setTrending(response.products || []);
            } catch (error) {
                console.error("Failed to load trending:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    return (
        <Box sx={{ pb: 10 }}>
            <HeroVideo />

            <CategoryGrid />

            {/* Trending Section */}
            <Container maxWidth="xl" sx={{ py: 8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mb: 4 }}>
                    <Typography variant="h4" fontWeight={800}>
                        Trending Now
                    </Typography>
                    {/* Optional: View All Link */}
                </Box>
                
                <Grid container spacing={3}>
                    {loading 
                        ? Array.from(new Array(4)).map((_, i) => (
                            <Grid item xs={12} sm={6} md={3} key={i}>
                                <ProductCard loading />
                            </Grid>
                          ))
                        : trending.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                          ))
                    }
                </Grid>
            </Container>

            <FeatureSpotlight />
        </Box>
    );
};

export default Homepage;