import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Divider,
    IconButton,
    Stack,
} from '@mui/material';
import { Facebook, GitHub } from '@mui/icons-material';
import GoogleIcon from '../components/common/GoogleIcon';
import { underlineHoverEffect } from '../styles/common';

const LoginPage = () => {
    const { summary, isMerging } = useCart();

    const handleGoogleLogin = () => {
        const API_URL = import.meta.env.VITE_API_URL;
        window.location.href = `${API_URL}/auth/google`;
    };

    return (
        <Container component="main" maxWidth="lg">
            {summary.itemCount > 0 && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    You have {summary.itemCount} item(s) in your cart.
                    Sign in to save them!
                </Alert>
            )}

            {isMerging && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    Merging your cart...
                </Alert>
            )}

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Stack>
                    < Typography component="h1" variant="h5">
                        Login to Your Account
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Stack flexDirection='row' mt={2}>
                            <Link
                                href="#"
                                variant="body2"
                                sx={{
                                    textDecoration: 'none',
                                    position: 'relative',
                                    ...underlineHoverEffect(1.5)
                                }}
                            >
                                Forgot password?
                            </Link>
                        </Stack>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Divider sx={{ my: 2 }}>OR</Divider>

                        <Stack flexDirection='row' justifyContent='center'>
                            <IconButton aria-label="Sign in with Google" onClick={handleGoogleLogin}>
                                <GoogleIcon />
                            </IconButton>
                            <IconButton aria-label="Sign in with Facebook">
                                <Facebook sx={{ color: '#1877F2' }} />
                            </IconButton>
                            <IconButton aria-label="Sign in with GitHub">
                                <GitHub sx={{ color: '#333' }} />
                            </IconButton>
                        </Stack>
                        <Stack flexDirection='row' mt={2} sx={{ justifyContent: { xs: 'center', md: "flex-end" } }}>
                            <Link href="#" variant="body2" sx={{ textDecoration: 'none', position: 'relative', ...underlineHoverEffect(1.5) }}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Container >
    );
};

export default LoginPage;