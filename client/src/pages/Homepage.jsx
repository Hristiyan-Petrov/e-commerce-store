import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

// Components
import HeroVideo from '../components/home/HeroVideo';

const Homepage = () => {
    return (
        <Box sx={{ pb: 10 }}>
            <HeroVideo />

           
        </Box>
    );
};

export default Homepage;