import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

// REPLACE THESE WITH YOUR REAL ASSETS
const POSTER_SRC = "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1080&auto=format&fit=crop";

const HeroVideo = () => {
    const navigate = useNavigate();
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const theme = useTheme();
    const isWideScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isLandscape = useMediaQuery('(orientation: landscape)');
    const isTablet = useMediaQuery('(min-width:600px) and (max-width:1200px) and (orientation: portrait)');

    const showDesktopVideo = isWideScreen && isLandscape;

    const mobileVideo = '/assets/videos/hero-video-2-mobile.mp4';
    const desktopVideo = '/assets/videos/hero-video-2.mp4';
    const activeVideoSrc = showDesktopVideo ? desktopVideo : mobileVideo;

    return (
        <Box
            sx={{
                position: 'relative',
                height: {
                    xs: '85vh',
                    sm: '95vh',
                },
                width: '100%',
                overflow: 'hidden',
                bgcolor: 'black'
            }}
        >
            {/* Background Video */}
            <Box
                component="video"
                // IMPORTANT: The 'key' forces React to completely re-render the element
                // when the source changes. This prevents black screens on rotation.
                key={activeVideoSrc}

                autoPlay
                loop
                muted
                playsInline
                poster={POSTER_SRC}
                onLoadedData={() => setIsVideoLoaded(true)}
                src={activeVideoSrc}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',

                    // The "Magic" responsive CSS
                    objectFit: 'cover', // Ensures the video fills the box no matter what
                    objectPosition: showDesktopVideo
                        ? 'center center'
                        : (isTablet ? 'center 25%' : 'center top'),

                    opacity: isVideoLoaded ? 0.6 : 0,
                    transition: 'opacity 1s ease-in-out',
                }}
            />

            {/* Gradient Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to top, ${alpha('#000', 0.9)} 0%, ${alpha('#000', 0.3)} 50%, ${alpha('#000', 0.3)} 100%)`,
                }}
            />

            {/* Hero Content */}
            <Container
                maxWidth="xl"
                sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    textAlign: { xs: 'center', md: 'left' },
                    pt: { xs: 10, md: 20 },
                    pt: 10,
                    justifyContent: { xs: 'center', md: 'center' },
                    zIndex: 2
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
                            fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
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
                            fontWeight: 400,
                            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
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