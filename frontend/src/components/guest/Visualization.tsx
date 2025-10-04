import React, { useState } from 'react';


import { Container, Grid, Typography, Box, Card, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Telescope, Sparkles } from 'lucide-react';
import IMAGES from '../../config/images.ts';
import { visualizationStats } from '../../config/mockData.ts';

// ============================================
// INTERFACES
// ============================================

interface VisualizationStat {
  value: string | number;
  label: string;
}

interface VisualizationProps {
  title?: string;
  subtitle?: string;
  overline?: string;
  stats?: VisualizationStat[];
  onExploreClick?: () => void;
}

// ============================================
// SECCIÓN: VISUALIZACIÓN INTERACTIVA
// Edita: contenido de la visualización
// ============================================

const Visualization: React.FC<VisualizationProps> = ({
  title = 'Mapa Estelar Interactivo',
  subtitle = 'Visualiza los exoplanetas descubiertos en una representación interactiva del cosmos',
  overline = 'Exploración Visual',
  stats = visualizationStats,
  onExploreClick,
}) => {
  const [showIframe, setShowIframe] = useState(false);
  const handleExploreClick = () => {
    setShowIframe(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2 }}
        >
          {overline}
        </Typography>

        <Typography variant="h2" sx={{ mt: 2, mb: 2 }}>
          {title}
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}
        >
          {subtitle}
        </Typography>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card
          sx={{
            p: 4,
            position: 'relative',
            minHeight: 400,
            background: `linear-gradient(145deg, rgba(10, 10, 15, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%), url(${IMAGES.solarSystem})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {[...Array(20)].map((_, i: number) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                bgcolor: 'white',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                '@keyframes twinkle': {
                  '0%, 100%': { opacity: 0.2 },
                  '50%': { opacity: 1 },
                },
              }}
            />
          ))}

          {/* Aquí está la integración: render condicional */}
          {!showIframe ? (
            <Box sx={{ textAlign: 'center', zIndex: 1 }}>
              <Telescope size={64} color="#6366f1" style={{ marginBottom: 16 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>
                Visualización Interactiva
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Aquí se mostrará un mapa 3D interactivo de los sistemas exoplanetarios
              </Typography>
              <Button
                variant="contained"
                startIcon={<Sparkles />}
                onClick={handleExploreClick} // <- cambio aquí
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                Explorar en 3D
              </Button>
            </Box>
          ) : (
            <iframe
              src="https://eyes.nasa.gov/apps/exo/"
              width="100%"
              height="600"
              style={{ border: 'none', borderRadius: 8 }}
              allowFullScreen
              title="Mapa interactivo de exoplanetas NASA"
            />
          )}
        </Card>
      </motion.div>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {stats.map((item: VisualizationStat, idx: number) => (
          <Grid size={{ xs: 6, md: 3 }} key={idx}>
            <Box
              sx={{
                textAlign: 'center',
                p: 2,
                borderRadius: 2,
                bgcolor: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(99, 102, 241, 0.1)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography variant="h4" sx={{ color: 'primary.light', fontWeight: 700 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {item.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


export default Visualization;