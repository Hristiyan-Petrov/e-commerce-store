import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';

const FeatureSpotlight = () => {
    return (
        <Box sx={{ bgcolor: '#111', color: 'white', py: 10, overflow: 'hidden' }}>
            <Container maxWidth="xl">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={5}>
                        <Typography 
                            variant="overline" 
                            color="primary" 
                            sx={{ letterSpacing: 3, fontWeight: 700 }}
                        >
                            TECHNOLOGY
                        </Typography>
                        <Typography variant="h2" fontWeight={800} sx={{ mb: 3 }}>
                            OMNI-POINT <br /> SWITCHES
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'grey.500', mb: 4, fontSize: '1.1rem' }}>
                            Adjust the actuation distance of your keys to the nearest 0.1mm. 
                            Whether you prefer a feather-light touch for gaming or a 
                            deep press for typing, the choice is yours.
                        </Typography>
                        <Button 
                            variant="outlined" 
                            color="inherit" 
                            size="large"
                            sx={{ borderRadius: 24, px: 4 }}
                        >
                            Read Specs
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12} md={7}>
                        {/* Placeholder for a Technical Product Cutout Image */}
                        <Box 
                            component="img"
                            src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200" 
                            sx={{ 
                                width: '100%', 
                                borderRadius: 4, 
                                filter: 'grayscale(100%) contrast(120%)',
                                transition: 'filter 0.5s',
                                '&:hover': { filter: 'grayscale(0%) contrast(100%)' }
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FeatureSpotlight;