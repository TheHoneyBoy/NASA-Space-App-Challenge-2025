import { createTheme } from '@mui/material';
import type { Theme } from '@mui/material';

// ============================================
// CONFIGURACIÓN DEL TEMA DE MATERIAL UI
// Personaliza los colores aquí
// ============================================

const theme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Índigo/Púrpura principal - EDITA AQUÍ
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#06b6d4', // Cyan/Turquesa - EDITA AQUÍ
      light: '#22d3ee',
      dark: '#0891b2',
    },
    background: {
      default: '#0a0a0f', // Negro profundo - EDITA AQUÍ
      paper: '#1a1a2e', // Azul oscuro para cards - EDITA AQUÍ
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      // Responsive
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      // Responsive
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      // Responsive
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      // Responsive
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
  },
  components: {
    // Personalización de botones
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '12px 32px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
      },
    },
    // Personalización de cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
        },
      },
    },
    // Personalización de inputs
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

export default theme;