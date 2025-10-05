import React from 'react';
import { Container, Grid, Typography, Box, Card, Button, Chip, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Database, ArrowRight } from 'lucide-react';
import IMAGES from '../../config/images.ts';
import { nasaDatasets } from '../../config/mockData.ts';

// ============================================
// INTERFACES Y TIPOS
// ============================================

/**
 * Estructura de un dataset de NASA
 */
interface NASADataset {
  name: string;
  description: string;
  updated: string;
  link: string;
  size?: string;
  format?: string;
}

/**
 * Props del componente DatasetsSection
 * Opcional: permite personalizar textos
 */
interface DatasetsSectionProps {
  /** Título de la sección */
  title?: string;
  /** Subtítulo/descripción de la sección */
  subtitle?: string;
  /** Texto del overline */
  overline?: string;
  /** Array personalizado de datasets (opcional, usa mockData por defecto) */
  datasets?: NASADataset[];
  /** Mostrar imagen del telescopio */
  showTelescopeImage?: boolean;
}

// ============================================
// SECCIÓN: DATASETS DE NASA
// Edita: información de datasets en mockData.ts
// ============================================

const DatasetsSection: React.FC<DatasetsSectionProps> = ({
  title = 'NASA Public Datasets',
  subtitle = 'Access the same data scientists use to discover new worlds',
  overline = 'Official Data',
  datasets = nasaDatasets,
  showTelescopeImage = true,
}) => {
  /**
   * Handles dataset click event
   * @param datasetName - Name of the clicked dataset
   * @param datasetLink - Dataset URL
   */
  
  const handleDatasetClick = (datasetName: string, datasetLink: string): void => {
    console.log(`Navigating to dataset: ${datasetName}`);
    void datasetLink; // evita el error de variable no usada
  };

  

  return (
    <Box 
      sx={{ 
        // EDITA AQUÍ: Cambia el color de fondo
        bgcolor: 'rgba(6, 182, 212, 0.05)', 
        py: 12 
      }}
    >
      <Container maxWidth="lg">
        {/* Encabezado de la sección */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
              mb: 2,
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>

          {/* Subtítulo - EDITA mediante props */}
          <Typography 
            variant="body1"
            component="p"
            sx={{ 
              color: 'text.secondary', 
              maxWidth: '700px', 
              mx: 'auto', 
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Cards de datasets - EDITA datasets en mockData.ts */}
        <Grid container spacing={4}>
          {datasets.map((dataset: NASADataset, idx: number) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>

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
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: 2,
                    // EDITA AQUÍ: Ajusta el efecto hover
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(6, 182, 212, 0.3)',
                    },
                  }}
                >
                  {/* Header del card: icono y fecha de actualización */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      gap: 1,
                    }}
                  >
                    {/* Icono - EDITA AQUÍ: Cambia el icono o color */}
                    <Database size={24} color="#06b6d4" />
                    
                    {/* Chip de fecha de actualización */}
                    <Chip
                      label={dataset.updated}
                      size="small"
                      sx={{
                        ml: 'auto',
                        bgcolor: 'rgba(6, 182, 212, 0.2)',
                        color: 'secondary.light',
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  {/* Nombre del dataset */}
                  <Typography 
                    variant="h6" 
                    component="h3"
                    sx={{ 
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {dataset.name}
                  </Typography>

                  {/* Descripción del dataset */}
                  <Typography 
                    variant="body2"
                    component="p"
                    sx={{ 
                      color: 'text.secondary', 
                      mb: 3, 
                      flexGrow: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    {dataset.description}
                  </Typography>

                  {/* Información adicional (si existe) */}
                  {(dataset.size || dataset.format) && (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: 1, 
                        mb: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      {dataset.size && (
                        <Chip 
                          label={`Tamaño: ${dataset.size}`} 
                          size="small" 
                          variant="outlined"
                        />
                      )}
                      {dataset.format && (
                        <Chip 
                          label={dataset.format} 
                          size="small" 
                          variant="outlined"
                          color="secondary"
                        />
                      )}
                    </Box>
                  )}

                  {/* Botón para explorar dataset */}
                  <Button
                    variant="outlined"
                    fullWidth
                    endIcon={<ArrowRight size={18} />}
                    component={Link}
                    href={dataset.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDatasetClick(dataset.name, dataset.link)}
                    sx={{
                      borderColor: 'secondary.main',
                      color: 'secondary.main',
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1,
                      // EDITA AQUÍ: Ajusta estilos del botón
                      '&:hover': {
                        borderColor: 'secondary.light',
                        bgcolor: 'rgba(6, 182, 212, 0.1)',
                      },
                    }}
                  >
                    Explore Dataset
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Imagen de telescopio - EDITA showTelescopeImage para ocultar */}
        {showTelescopeImage && (
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box
                component="img"
                src={IMAGES.telescope}
                alt="Telescopio espacial observando exoplanetas"
                loading="lazy"
                sx={{
                  width: '100%',
                  maxWidth: '700px',
                  borderRadius: 4,
                  // EDITA AQUÍ: Ajusta la sombra de la imagen
                  boxShadow: '0 20px 60px rgba(6, 182, 212, 0.3)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              />
            </motion.div>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DatasetsSection;

// ============================================
// EJEMPLO DE USO:
// ============================================
// import DatasetsSection from './DatasetsSection';
//
// // Uso básico (usa valores por defecto)
// <DatasetsSection />
//
// // Uso personalizado
// <DatasetsSection 
//   title="Datos Científicos Abiertos"
//   subtitle="Explora datasets de misiones espaciales"
//   overline="Open Data"
//   showTelescopeImage={false}
//   datasets={customDatasets}
// />
// ============================================