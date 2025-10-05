import React from 'react';
import { Container, Grid, Typography, Box, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { Database, Brain, BarChart3, TrendingUp } from 'lucide-react';
import IMAGES from '../../config/images.ts';
import { predictionSteps } from '../../config/mockData.ts';

// ============================================
// INTERFACES
// ============================================

interface PredictionStep {
  step: '01' | '02' | '03' | '04';
  title: string;
  desc: string;
}

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  overline?: string;
  steps?: PredictionStep[];
}

// ============================================
// SECCIÓN: CÓMO FUNCIONA LA PREDICCIÓN
// Edita: pasos del proceso
// ============================================
const HowItWorks: React.FC<HowItWorksProps> = ({
  title = 'How Does Prediction Work?',
  subtitle = 'Our system uses machine learning algorithms trained with real data from space missions such as Kepler, TESS, and K2',
  overline = 'Intelligent Technology',
  steps = predictionSteps,
}) => {

  // Mapeo de iconos - EDITA aquí para cambiar iconos
  const iconMap: Record<string, React.ReactNode> = {
    '01': <Database size={32} />,
    '02': <Brain size={32} />,
    '03': <BarChart3 size={32} />,
    '04': <TrendingUp size={32} />,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        {/* Overline - EDITA mediante props */}
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2 }}
        >
          {overline}
        </Typography>
        
        {/* Título - EDITA mediante props */}
        <Typography variant="h2" sx={{ mt: 2, mb: 2 }}>
          {title}
        </Typography>
        
        {/* Descripción - EDITA mediante props */}
        <Typography 
          variant="body1" 
          sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Proceso en 4 pasos - EDITA EN mockData.ts */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {steps.map((item: PredictionStep, idx: number) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  // EDITA: efecto hover aquí
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.3)',
                  },
                }}
              >
                {/* Número del paso - EDITA estilos aquí */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: 20,
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                  }}
                >
                  {item.step}
                </Box>
                
                {/* Icono */}
                <Box sx={{ color: 'primary.light', mb: 2, mt: 2 }}>
                  {iconMap[item.step]}
                </Box>
                
                {/* Título */}
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  {item.title}
                </Typography>
                
                {/* Descripción */}
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.desc}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Imagen concepto IA - CAMBIA EN images.ts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Box
          component="img"
          src={IMAGES.aiConcept}
          alt="Concepto de Inteligencia Artificial para exoplanetas"
          sx={{
            width: '100%',
            maxWidth: '900px',
            mx: 'auto',
            display: 'block',
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)',
          }}
        />
      </motion.div>
    </Container>
  );
};

export default HowItWorks;