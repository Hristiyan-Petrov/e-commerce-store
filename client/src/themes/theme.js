import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#799EFF'
        },
        secondary: {
            main: '#FEFFC4'
        },
        background: {
            default: '#f4f6f8',
            paper: '#fff'
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700
        },
        h2: {
            fontWeight: 700
        }
    },
    components: {
        MuiButton: {
            styleOverride: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none'
                }
            }
        }
    }
});