import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme';
import { useMemo, useState } from 'react';

const Root = () => {
  // const [mode, setMode] = useState<'light' | 'dark'>('light');
  // const theme = useMemo(() => getTheme(mode), [mode]);
  const theme = useMemo(() => getTheme('dark'), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);