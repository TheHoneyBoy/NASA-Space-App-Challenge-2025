import React, { useRef, useState, useEffect } from 'react';
import { Box, ThemeProvider, CssBaseline, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const introRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const visualizationRef = useRef<HTMLDivElement>(null);

  // Estado para mostrar/ocultar el botón según scroll
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollToIntro = () => {
    introRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToVisualization = () => {
    visualizationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detectar scroll para mostrar/ocultar botón
  useEffect(() => {
    const controlButton = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setShowButton(true);
      } else if (currentScrollY > lastScrollY) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlButton);
    return () => window.removeEventListener('scroll', controlButton);
  }, [lastScrollY]);

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

        {/* Botón Volver a Inicio */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 32,
                left: 32,
                zIndex: 1000,
              }}
            >
              <Button
                startIcon={<ArrowLeft size={20} />}
                onClick={() => navigate('/')}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  padding: '8px 16px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                  },
                }}
              >
                Volver a Inicio
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sección 1: Hero */}
        <HeroSection 
          onPrimaryClick={scrollToIntro}
          onSecondaryClick={scrollToVisualization} 
        />

        {/* Sección 2: Introducción */}
        <Box ref={introRef}>
          <IntroSection />
        </Box>

        {/* Sección 3: ¿Qué son los exoplanetas? */}
        <ExoplanetsInfo />

        {/* Sección 4: Cómo funciona */}
        <HowItWorks />

        {/* Sección 5: Estadísticas */}
        <Statistics />

        {/* Sección 6: Visualización */}
        <Box ref={visualizationRef}>
          <Visualization />
        </Box>

        {/* Sección 7: Datasets */}
        <DatasetsSection />

        {/* Sección 8: Demo de predicción */}
        <Box ref={demoRef}>
          <PredictionDemo />
        </Box>

        {/* Sección 9: CTA */}
        <CTASection onViewPlans={scrollToDemo} />

        {/* Sección 10: Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default GuestLanding