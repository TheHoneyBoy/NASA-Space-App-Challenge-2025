import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import IMAGES from '../../config/images.ts';
import { exoplanetInfo } from '../../config/mockData.ts';

// ============================================
// INTERFACES Y TIPOS
// ============================================

/**
 * Estructura de información educativa sobre exoplanetas
 */
interface ExoplanetInfoItem {
  title: string;
  desc: string;
  icon?: string;
}

/**
 * Props del componente ExoplanetsInfo
 * Opcional: permite personalizar textos e imágenes
 */
interface ExoplanetsInfoProps {
  /** Título principal de la sección */
  title?: string;
  /** Texto del overline */
  overline?: string;
  /** Descripción principal/introducción */
  description?: string;
  /** Array personalizado de información (opcional, usa mockData por defecto) */
  infoItems?: ExoplanetInfoItem[];
  /** URL de la imagen del exoplaneta */
  imageUrl?: string;
  /** Texto alternativo de la imagen */
  imageAlt?: string;
  /** Invertir orden de imagen y texto en desktop */
  reverseLayout?: boolean;
}

// ============================================
// SECCIÓN: ¿QUÉ SON LOS EXOPLANETAS?
// Edita: contenido educativo
// ============================================

const ExoplanetsInfo: React.FC<ExoplanetsInfoProps> = ({
  title = '¿Qué son los Exoplanetas?',
  overline = 'Conocimiento Astronómico',
  description = 'Los exoplanetas o planetas extrasolares son mundos que orbitan estrellas distintas a nuestro Sol. Desde el descubrimiento del primer exoplaneta confirmado en 1992, hemos encontrado más de 5,500 de estos mundos fascinantes.',
  infoItems = exoplanetInfo,
  imageUrl = IMAGES.exoplanet,
  imageAlt = 'Exoplaneta orbitando una estrella distante',
  reverseLayout = false,
}) => {
  /**
   * Calcula el orden de los elementos del grid según el layout
   */
  const getImageOrder = (): { xs: number; md: number } => {
    return reverseLayout 
      ? { xs: 2, md: 2 } 
      : { xs: 2, md: 1 };
  };

  const getTextOrder = (): { xs: number; md: number } => {
    return reverseLayout 
      ? { xs: 1, md: 1 } 
      : { xs: 1, md: 2 };
  };

  /**
   * Maneja el click en un item de información
   * @param itemTitle - Título del item clickeado
   */
  const handleInfoItemClick = (itemTitle: string): void => {
    console.log(`Info item clicked: ${itemTitle}`);
    // EDITA AQUÍ: Añade tracking o navegación si lo necesitas
    // analytics.track('exoplanet_info_clicked', { title: itemTitle });
  };

  return (
    <Box 
      sx={{ 
        // EDITA AQUÍ: Cambia el color de fondo
        bgcolor: 'rgba(99, 102, 241, 0.05)', 
        py: 12 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Imagen planeta - CAMBIA EN images.ts o mediante props */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ order: getImageOrder() }}
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box
                component="img"
                src={imageUrl}
                alt={imageAlt}
                loading="lazy"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  // EDITA AQUÍ: Ajusta la sombra de la imagen
                  boxShadow: '0 20px 60px rgba(6, 182, 212, 0.4)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02) rotate(1deg)',
                  },
                }}
              />
            </motion.div>
          </Grid>

          {/* Contenido de texto */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ order: getTextOrder() }}
          >

            <motion.div
              initial={{ opacity: 0, x: reverseLayout ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Overline - EDITA mediante props */}
              <Typography
                variant="overline"
                component="p"
                sx={{ 
                  color: 'secondary.main', 
                  fontWeight: 600, 
                  letterSpacing: 2,
                  fontSize: '0.875rem',
                }}
              >
                {overline}
              </Typography>
              
              {/* Título - EDITA mediante props */}
              <Typography 
                variant="h2" 
                component="h2"
                sx={{ 
                  mt: 2, 
                  mb: 3,
                  fontWeight: 700,
                }}
              >
                {title}
              </Typography>
              
              {/* Contenido educativo - EDITA mediante props */}
              <Typography 
                variant="body1"
                component="p"
                sx={{ 
                  mb: 3, 
                  color: 'text.secondary', 
                  fontSize: '1.1rem', 
                  lineHeight: 1.8,
                }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              
              {/* Cards informativos - EDITA EN mockData.ts */}
              <Box sx={{ mb: 3 }}>
                {infoItems.map((item: ExoplanetInfoItem, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      onClick={() => handleInfoItemClick(item.title)}
                      sx={{
                        mb: 2,
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        bgcolor: 'rgba(6, 182, 212, 0.05)',
                        cursor: 'pointer',
                        // EDITA AQUÍ: Ajusta efectos de hover
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(6, 182, 212, 0.1)',
                          transform: 'translateX(8px)',
                          borderColor: 'rgba(6, 182, 212, 0.4)',
                        },
                      }}
                    >
                      {/* Título del item */}
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ 
                          color: 'secondary.light', 
                          mb: 0.5,
                          fontWeight: 600,
                          fontSize: '1.1rem',
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* Descripción del item */}
                      <Typography 
                        variant="body2" 
                        component="p"
                        sx={{ 
                          color: 'text.secondary',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ExoplanetsInfo;

// ============================================
// EJEMPLO DE USO:
// ============================================
// import ExoplanetsInfo from './ExoplanetsInfo';
//
// // Uso básico (usa valores por defecto)
// <ExoplanetsInfo />
//
// // Uso personalizado
// <ExoplanetsInfo 
//   title="Descubre los Exoplanetas"
//   overline="Ciencia Espacial"
//   description="Texto personalizado con <strong>HTML</strong>"
//   reverseLayout={true}
//   imageUrl="/custom-planet.jpg"
//   infoItems={customInfoArray}
// />
// ============================================