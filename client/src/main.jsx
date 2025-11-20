import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/Homepage.jsx';
import Layout from './layout/Layout.jsx';
import LoginPage from './pages/Login.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ROUTES } from './constants/routes.js';

const theme = createTheme({
    palette: {
        primary: {
            main: '#17FBD1',
            light: '#D6F5F0',
            dark: '#128771ff',
            // contrastText: '#fff',
        },
        secondary: {
            main: '#1b1b1b',
            light: '#E7E9EB',
            // dark: '#494A4B',
            // contrastText: '#fff',
        },
        success: {
            main: '#4CAF50',
        },
        error: {
            main: '#F44336',
        },
        warning: {
            main: '#FF9800',
        },
        background: {
            default: '#F8F9FA',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: [
            'Roboto Mono',
            'monospace',
        ].join(','),
    },
    components: {
        MuiLink: {
            // styleOverrides
            defaultProps: {
                color: 'inherit'
            }
        },
        MuiIconButton: {
            defaultProps: {
                color: 'secondary'
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    fontWeight: 800,
                    letterSpacing: 1.5
                }
            }
        }

    }
});

function GuestRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user)
        return <Navigate to='/' replace={true} />

    return children;
};

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user)
        return <Navigate to={ROUTES.LOGIN} replace={true} />

    return children;
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Layout />} >
                                <Route index element={<HomePage />} />
                                <Route
                                    path='login'
                                    element={
                                        <GuestRoute>
                                            <LoginPage />
                                        </GuestRoute>
                                    }
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
)
