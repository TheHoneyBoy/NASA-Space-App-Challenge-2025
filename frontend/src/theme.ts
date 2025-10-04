import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#000000' : '#ffffff',      
      contrastText: mode === 'light' ? '#ffffff' : '#000000', 
    },
  },
});