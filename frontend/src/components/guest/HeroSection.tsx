import React from 'react';
import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Telescope } from 'lucide-react';
import IMAGES from '../../config/images.ts';

// ============================================
// INTERFACES
// ============================================

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

// ============================================
// HERO SECTION - Banner principal
// Edita: título, subtítulo, botones
// ============================================

const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'Explora el Universo de los\nExoplanetas con IA',
  subtitle = 'Descubre mundos más allá de nuestro sistema solar usando el poder de la inteligencia artificial',
  badgeText = 'HAWA HP - Más allá del cielo',
  primaryButtonText = 'Empezar Exploración',
  secondaryButtonText = 'Visualización Interactiva',
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const { scrollY } = useScroll();
  
  // Efectos parallax - EDITA rangos aquí para ajustar velocidad
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        
        // EDITA: imagen de fondo en IMAGES.heroBackground
        background: `linear-gradient(180deg, rgba(10, 10, 15, 0.7) 0%, rgba(10, 10, 15, 0.9) 100%), url(${IMAGES.heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      
      


      {/* Efecto de estrellas animadas - EDITA colores y posiciones aquí */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
        }}
      />
      
      <motion.div style={{ y: heroY, opacity: heroOpacity, width: '100%' }}>
        <Container maxWidth="lg" >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            {/* Badge superior - EDITA mediante props o directamente aquí */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Chip
                icon={<Sparkles size={16} />}
                label={badgeText}
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(99, 102, 241, 0.2)',
                  color: 'primary.light',
                  fontSize: '0.9rem',
                  py: 2.5,
                  px: 1,
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                }}
              />
            </motion.div>

            {/* Título principal - EDITA mediante props o directamente aquí */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  // EDITA: gradiente del título aquí
                  background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 80px rgba(99, 102, 241, 0.5)',
                }}
              >
                {title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </Typography>
            </motion.div>

            {/* Subtítulo - EDITA mediante props o directamente aquí */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 5,
                  color: 'text.secondary',
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                {subtitle}
              </Typography>
            </motion.div>

            {/* Botones CTA - EDITA texto mediante props y enlaces con callbacks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight />}
                  onClick={onPrimaryClick}
                  sx={{
                    // EDITA: gradiente del botón aquí
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                    '&:hover': {
                      boxShadow: '0 12px 48px rgba(99, 102, 241, 0.6)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {primaryButtonText}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Telescope />}
                  onClick={onSecondaryClick}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(99, 102, 241, 0.1)',
                    },
                  }}
                >
                  {secondaryButtonText}
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </motion.div>

      {/* Indicador de scroll - EDITA estilos aquí */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 50,
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                bgcolor: 'white',
                borderRadius: '50%',
              }}
            />
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HeroSection;