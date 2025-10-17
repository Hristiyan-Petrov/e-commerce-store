import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './themes/theme.js';
import Homepage from './pages/Homepage.jsx';
import Layout from './components/layout/Layout.jsx';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#2c3e50', // A modern, dark blue
//     },
//     secondary: {
//       main: '#e67e22', // A vibrant orange for CTAs
//     },
//     background: {
//       default: '#ecf0f1', // Light grey background
//       paper: '#ffffff',
//     },
//     text: {
//       primary: '#34495e',
//       secondary: '#7f8c8d',
//     },
//   },
//   typography: {
//     fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontSize: '3.5rem',
//       fontWeight: 700,
//     },
//     h2: {
//       fontSize: '2.5rem',
//       fontWeight: 600,
//       marginBottom: '1rem',
//     },
//     h4: {
//       fontWeight: 600,
//     }
//   },
//   components: {
//     // Style overrides for Button component
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '50px', // Pill-shaped buttons
//           textTransform: 'none',
//           padding: '10px 24px',
//           fontWeight: 600,
//         },
//       },
//     },
//     // Style overrides for Card component
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: '16px',
//           boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
//           transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//           '&:hover': {
//             transform: 'translateY(-5px)',
//             boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
//           },
//         },
//       },
//     },
//   },
// });

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />} >
                        <Route index element={<Homepage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
)
