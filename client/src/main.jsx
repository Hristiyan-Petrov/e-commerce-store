import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/Homepage.jsx';
import Layout from './layout/Layout.jsx';
import LoginPage from './pages/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

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
        // primary: {
        //     main: '#0F3A7D',      // Deep tech blue
        //     light: '#4A6FA5',
        //     dark: '#051F3E',
        //     contrastText: '#fff',
        // },
        // secondary: {
        //     main: '#FF9500',      // Warm orange
        //     light: '#FFB84D',
        //     dark: '#CC7700',
        //     contrastText: '#fff',
        // },
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
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Layout />} >
                            <Route index element={<HomePage />} />
                            <Route path='login' element={<LoginPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
)
