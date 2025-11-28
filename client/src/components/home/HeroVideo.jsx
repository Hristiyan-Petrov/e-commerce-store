import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

// REPLACE THESE WITH YOUR REAL ASSETS
// const VIDEO_SRC = "https://assets.mixkit.co/videos/preview/mixkit-gaming-keyboard-typing-lighting-40590-large.mp4"; // Placeholder
const POSTER_SRC = "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1080&auto=format&fit=crop";
const HeroVideo = () => {
    const navigate = useNavigate();
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const mobileVideo = '/assets/videos/hero-video-2-mobile.mp4';
    const desktopVideo = '/assets/videos/hero-video-2.mp4';

    return (
        <Box 
            sx={{ 
                position: 'relative', 
                height: { xs: '85vh', md: '90vh' }, 
                width: '100%', 
                overflow: 'hidden',
                bgcolor: 'black' 
            }}
        >
        {/* <Box sx={{ width: '100%', height: '100vh' }}> */}
            {/* Background Video */}
            <Box
                component="video"
                // key={}
                autoPlay
                loop
                muted
                playsInline
                poster={POSTER_SRC}
                onLoadedData={() => setIsVideoLoaded(true)}
                src={isDesktop ? desktopVideo : mobileVideo}
                // src={mobileVideo}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isVideoLoaded ? 0.6 : 0, // Fade in once ready
                    transition: 'opacity 1s ease-in-out',
                    // zIndex: 0
                }}
            >
                {/* <source src='/assets/videos/hero-video-2.mp4' type="video/mp4" /> */}
            </Box>

            {/* Gradient Overlay for Text Readability */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to top, ${alpha('#000', 0.8)} 0%, ${alpha('#000', 0.2)} 50%, ${alpha('#000', 0.4)} 100%)`,
                    // zIndex: 1
                }}
            />

            {/* Hero Content */}
            <Container
                maxWidth="xl"
                sx={{
                    position: 'relative',
                    // zIndex: 2, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    textAlign: { xs: 'center', md: 'left' },
                    pt: 10
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            color: 'white',
                            fontWeight: 900,
                            fontSize: { xs: '3rem', md: '5rem', lg: '6.5rem' },
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            mb: 2,
                            textTransform: 'uppercase'
                        }}
                    >
                        Precision <br />
                        <Box component="span" sx={{ color: 'primary.main' }}>Redefined.</Box>
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'grey.300',
                            mb: 5,
                            maxWidth: '600px',
                            fontWeight: 400
                        }}
                    >
                        Experience the next generation of inputs. Engineered for professionals, designed for everyone.
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/shop')}
                        sx={{
                            px: 5,
                            py: 1.5,
                            fontSize: '1.1rem',
                            color: 'black'
                        }}
                    >
                        Shop Collection
                    </Button>
                </motion.div>
            </Container>
        </Box>
    );
};

export default HeroVideo;