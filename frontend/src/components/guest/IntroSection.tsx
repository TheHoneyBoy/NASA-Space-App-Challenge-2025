import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Brain, Database, Rocket } from 'lucide-react';
import IMAGES from '../../config/images.ts';

// ============================================
// INTERFACES
// ============================================

interface Feature {
  icon: React.ReactNode;
  text: string;
}

interface IntroSectionProps {
  title?: string;
  overline?: string;
  paragraph1?: string;
  paragraph2?: string;
  features?: Feature[];
}

// ============================================
// SECCIÓN DE INTRODUCCIÓN A HAWA HP
// Edita: texto descriptivo, features
// ============================================
const IntroSection: React.FC<IntroSectionProps> = ({
  title = 'Your Window to the Cosmos',
  overline = 'Welcome to HAWA HP',
  paragraph1 = 'HAWA HP is an educational and interactive platform that combines modern astronomy with the power of artificial intelligence to democratize knowledge about exoplanets.',
  paragraph2 = 'Whether you are a curious student, a passionate educator, or a space enthusiast, you will find the tools here to explore, learn, and predict the existence of worlds beyond our solar system.',
  features = [
    { icon: <Brain size={24} />, text: 'Advanced AI' },
    { icon: <Database size={24} />, text: 'Real NASA Data' },
    { icon: <Rocket size={24} />, text: 'Interactive Exploration' },
  ],
}) => {

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Overline - EDITA mediante props */}
            <Typography
              variant="overline"
              sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 2 }}
            >
              {overline}
            </Typography>
            
            {/* Título - EDITA mediante props */}
            <Typography variant="h2" sx={{ mt: 2, mb: 3 }}>
              {title}
            </Typography>
            
            {/* Párrafo 1 - EDITA mediante props */}
            <Typography 
              variant="body1" 
              sx={{ mb: 3, color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              {paragraph1}
            </Typography>
            
            {/* Párrafo 2 - EDITA mediante props */}
            <Typography 
              variant="body1" 
              sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              {paragraph2}
            </Typography>
            
            {/* Features destacados - EDITA mediante props o inline */}
            <Grid container spacing={2}>
              {features.map((feature: Feature, idx: number) => (
                <Grid size={{ xs: 12, sm: 4 }} key={idx}>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      transition: 'all 0.3s ease',
                      // EDITA: efecto hover aquí
                      '&:hover': {
                        bgcolor: 'rgba(99, 102, 241, 0.15)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.light' }}>{feature.icon}</Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {feature.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        {/* Imagen astronauta - CAMBIA EN images.ts */}
        <Grid size={{ xs: 12, md: 6 }}>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              component="img"
              src={IMAGES.astronaut}
              alt="Astronauta explorando el espacio"
              sx={{
                width: '100%',
                borderRadius: 4,
                boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)',
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IntroSection;