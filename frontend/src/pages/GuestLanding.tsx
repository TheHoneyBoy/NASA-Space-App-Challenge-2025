import React from 'react';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../themeGUEST.ts';

// Importar todos los componentes
import HeroSection from '../components/guest/HeroSection';
import IntroSection from '../components/guest/IntroSection';
import ExoplanetsInfo from '../components/guest/ExoplanetsInfo';
import HowItWorks from '../components/guest/HowItWorks';
import Statistics from '../components/guest/Statistics';
import Visualization from '../components/guest/Visualization';
import DatasetsSection from '../components/guest/DatasetsSection';
import PredictionDemo from '../components/guest/PredictionDemo';
import CTASection from '../components/guest/CTASection';
import Footer from '../components/guest/Footer';

// ============================================
// PÁGINA PRINCIPAL: GUEST LANDING
// Esta página combina todos los componentes
// ============================================

const GuestLanding: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        overflowX: 'hidden',
        position: 'relative',
      }}>

        {/* Sección 1: Hero */}
        <HeroSection />

        {/* Sección 2: Introducción */}
        <IntroSection />

        {/* Sección 3: ¿Qué son los exoplanetas? */}
        <ExoplanetsInfo />

        {/* Sección 4: Cómo funciona */}
        <HowItWorks />

        {/* Sección 5: Estadísticas */}
        <Statistics />

        {/* Sección 6: Visualización */}
        <Visualization />

        {/* Sección 7: Datasets */}
        <DatasetsSection />

        {/* Sección 8: Demo de predicción */}
        <PredictionDemo />

        {/* Sección 9: CTA */}
        <CTASection />

        {/* Sección 10: Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default GuestLanding;