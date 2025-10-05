import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Brain, Database, TrendingUp, Sparkles } from 'lucide-react';
import { accountBenefits } from '../../config/mockData.ts';

// ============================================
// INTERFACES Y TIPOS
// ============================================

/**
 * Estructura de un beneficio de cuenta
 */
interface AccountBenefit {
  text: string;
  icon?: string;
}

/**
 * Props del componente CTASection
 * Opcional: permite personalizar textos y acciones
 */
interface CTASectionProps {
  /** Título principal del CTA */
  title?: string;
  /** Descripción/subtítulo del CTA */
  description?: string;
  /** Texto del botón principal */
  primaryButtonText?: string;
  /** Texto del botón secundario */
  secondaryButtonText?: string;
  /** Callback al hacer click en crear cuenta */
  onCreateAccount?: () => void;
  /** Callback al hacer click en ver demo */
  onViewPlans?: () => void;
}

// ============================================
// SECCIÓN: CTA FINAL - Llamado a la acción
// Edita: texto motivacional, botones
// ============================================

const CTASection: React.FC<CTASectionProps> = ({
  title = 'Ready to Explore the Universe?',
  description = 'Create your free account and access advanced prediction tools, train your own AI models, and join the community of space explorers.',
  primaryButtonText = 'Create Free Account',
  secondaryButtonText = 'View Demo',
  onCreateAccount,
  onViewPlans,
}) => {
  // Configuración de iconos para beneficios
  // EDITA AQUÍ: Cambia los iconos según tus necesidades
  const iconMap: React.ReactNode[] = [
    <Brain size={24} key="brain" />,
    <Database size={24} key="database" />,
    <TrendingUp size={24} key="trending" />,
    <Sparkles size={24} key="sparkles" />,
  ];

  /**
   * Maneja el click en el botón de crear cuenta
   */
  const handleCreateAccount = (): void => {
    if (onCreateAccount) {
      onCreateAccount();
    } else {
      // EDITA AQUÍ: Cambia la ruta de navegación
      console.log('Navegando a registro...');
      // Ejemplo: navigate('/register');
    }
  };

  /**
   * Maneja el click en el botón de ver planes
   */
  const handleViewPlans = (): void => {
    if (onViewPlans) {
      onViewPlans();
    } else {
      // EDITA AQUÍ: Cambia la ruta de navegación
      console.log('Navegando a planes...');
      // Ejemplo: navigate('/plans');
    }
  };

  return (
    <Box
      sx={{
        py: 12,
        // EDITA AQUÍ: Cambia el gradiente de fondo
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Efectos de fondo - EDITA AQUÍ: Ajusta posición y opacidad */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Icono principal - EDITA AQUÍ: Cambia el icono o su tamaño */}
            <Rocket size={64} color="white" style={{ marginBottom: 24 }} />
            
            {/* Título - EDITA mediante props o directamente aquí */}
            <Typography 
              variant="h2" 
              component="h2"
              sx={{ 
                mb: 3, 
                color: 'white',
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>
            
            {/* Descripción - EDITA mediante props o directamente aquí */}
            <Typography
              variant="h5"
              component="p"
              sx={{
                mb: 5,
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '800px',
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {description}
            </Typography>

            {/* Botones de acción - EDITA: textos, estilos y funciones */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight />}
                onClick={handleCreateAccount}
                sx={{
                  bgcolor: 'white',
                  color: '#6366f1',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                {primaryButtonText}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleViewPlans}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  borderWidth: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {secondaryButtonText}
              </Button>
            </Box>

            {/* Beneficios de crear cuenta - EDITA EN mockData.ts */}
            <Grid container spacing={3} sx={{ mt: 6, maxWidth: '900px', mx: 'auto' }}>
              {accountBenefits.map((benefit: AccountBenefit, idx: number) => (
                <Grid size={{ xs: 6, md: 3 }} key={idx}>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {/* Icono del beneficio */}
                      <Box 
                        sx={{ 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {iconMap[idx]}
                      </Box>
                      {/* Texto del beneficio */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                        }}
                      >
                        {benefit.text}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;

// ============================================
// EJEMPLO DE USO:
// ============================================
// import CTASection from './CTASection';
//
// <CTASection 
//   title="Tu título personalizado"
//   description="Tu descripción"
//   onCreateAccount={() => navigate('/register')}
//   onViewPlans={() => navigate('/plans')}
// />
// ============================================