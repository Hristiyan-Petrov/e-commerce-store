import { Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router';

export default function EmtyCart({
    toggle
}) {
    return (
        <Container>
            <Typography
                sx={{
                    letterSpacing: 1.5,
                    textAlign: 'center',
                    mb: 3,
                }}
            >
                Your shopping cart is empty.
            </Typography>
            <Button
                variant="contained"
                component={RouterLink}
                to="/shop"
                onClick={toggle}
                sx={{
                    maxWidth: 'fit-content',
                    fontSize: '0.8rem',
                    letterSpacing: 2.5,
                    px: 3,
                }}
            >
                Explore products
            </Button>
        </Container>
    );
};