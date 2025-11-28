import { Box, Typography, Container } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const BentoItem = ({ title, subtitle, image, link, sx, dark = false }) => {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => navigate(link)}
            sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'pointer',
                group: 'true', // Marker for hover state
                bgcolor: 'grey.100',
                transition: 'all 0.3s ease',
                ...sx,
                '&:hover .bento-img': {
                    transform: 'scale(1.05)',
                },
                '&:hover .bento-arrow': {
                    transform: 'translateX(5px)',
                    opacity: 1
                }
            }}
        >
            {/* Background Image */}
            <Box
                className="bento-img"
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    zIndex: 0
                }}
            />
            
            {/* Content Overlay */}
            <Box 
                sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    width: '100%', 
                    p: 4,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 1,
                    color: 'white'
                }}
            >
                <Typography variant="h4" fontWeight={800} gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {subtitle}
                    </Typography>
                    <ArrowForward className="bento-arrow" sx={{ fontSize: 20, transition: 'all 0.3s', opacity: 0.7 }} />
                </Box>
            </Box>
        </Box>
    );
};

const CategoryGrid = () => {
    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Typography variant="h4" fontWeight={800} mb={4}>
                Browse by Category
            </Typography>
            
            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, 
                gridTemplateRows: { xs: 'auto', md: 'repeat(2, 280px)' }, 
                gap: 3 
            }}>
                {/* Large Item: Keyboards (Takes 2x2 on Desktop) */}
                <BentoItem 
                    title="Mechanical Keyboards" 
                    subtitle="Click. Clack. Conquer."
                    link="/shop?category=keyboards"
                    image="/assets/categories/keyboards.png"
                    sx={{ gridColumn: { xs: '1', md: 'span 2' }, gridRow: { xs: 'auto', md: 'span 2' }, minHeight: 300 }}
                />

                {/* Wide Item: Mice (Takes 2 wide, 1 high) */}
                <BentoItem 
                    title="Precision Mice" 
                    subtitle="Zero latency tracking"
                    link="/shop?category=mice"
                    image="/assets/categories/mice.png"
                    sx={{ gridColumn: { xs: '1', md: 'span 2' }, minHeight: 250 }}
                />

                {/* Small Item: Audio */}
                <BentoItem 
                    title="Audio" 
                    subtitle="Immersive Sound"
                    link="/shop?category=audio"
                    image="/assets/categories/audio.png"
                    sx={{ minHeight: 250 }}
                />

                {/* Small Item: Accessories */}
                <BentoItem 
                    title="Accessories" 
                    subtitle="Desk mats & more"
                    link="/shop?category=accessories"
                    image="/assets/categories/accessories.png"
                    sx={{ minHeight: 250 }}
                />
            </Box>
        </Container>
    );
};

export default CategoryGrid;