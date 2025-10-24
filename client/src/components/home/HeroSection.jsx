import { Box, Button, Container, Stack, Typography } from '@mui/material';

const HeroSection = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #799EFF 95%), url(https://images.pexels.com/photos/1331696/pexels-photo-1331696.jpeg?auto=compress&cs=tinysrgb&);',
                py: { xs: 8, md: 12 }, // Vertical padding responsive
                // bgcolor: '#11284b',
                backgroundSize: 'cover',
                color: '#fff'
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={4} alignItems="center" sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{ fontWeight: 'bold' }}
                    >
                        Premium Digital Assets to Fuel Your Creativity
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Discover professionally crafted fonts, templates, and tools to
                        bring your vision to life. High quality, ready to use, and
                        instantly downloadable.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.5 }}>
                        Explore All Products
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default HeroSection;