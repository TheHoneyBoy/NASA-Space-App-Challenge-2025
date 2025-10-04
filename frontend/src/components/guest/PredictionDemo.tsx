import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Card, TextField, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// ============================================
// INTERFACES
// ============================================

interface FormData {
  orbitalPeriod: string;
  planetRadius: string;
  stellarTemp: string;
  transitDepth: string;
}

interface PredictionResult {
  probability: number;
  classification: string;
  type: string;
  zone: string;
  confidence: string;
}

interface PredictionDemoProps {
  title?: string;
  subtitle?: string;
  overline?: string;
}

// ============================================
// SECCIÓN: DEMO DE PREDICCIÓN
// Edita: campos del formulario, resultados
// ============================================

const PredictionDemo: React.FC<PredictionDemoProps> = ({
  title = 'Predicción Rápida de Exoplanetas',
  subtitle = 'Ingresa algunos datos básicos y observa cómo nuestra IA predice la probabilidad de un exoplaneta',
  overline = 'Prueba Nuestra IA',
}) => {
  const [formData, setFormData] = useState<FormData>({
    orbitalPeriod: '',
    planetRadius: '',
    stellarTemp: '',
    transitDepth: '',
  });

  const [result, setResult] = useState<PredictionResult>({
    probability: 87.3,
    classification: 'EXOPLANETA PROBABLE',
    type: 'Súper-Tierra',
    zone: 'Habitable',
    confidence: 'Alta',
  });

  // Maneja cambios en los inputs
  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Simula la predicción - EDITA la lógica aquí
  const handlePredict = () => {
    // Simulación simple basada en los valores
    const randomProb = Math.random() * 40 + 60; // Entre 60% y 100%
    setResult({
      probability: parseFloat(randomProb.toFixed(1)),
      classification: randomProb > 75 ? 'EXOPLANETA PROBABLE' : 'EXOPLANETA POSIBLE',
      type: randomProb > 80 ? 'Súper-Tierra' : 'Júpiter Caliente',
      zone: randomProb > 70 ? 'Habitable' : 'No Habitable',
      confidence: randomProb > 85 ? 'Alta' : 'Media',
    });
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

        {/* Subtítulo - EDITA mediante props */}
        <Typography 
          variant="body1" 
          sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Grid container spacing={6} alignItems="center">
        {/* Formulario de predicción */}
        <Grid size={{ xs: 12, md: 6 }}>

          <Card sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Datos de Entrada
            </Typography>
            
            {/* Campos del formulario - EDITA labels y helpers aquí */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Período Orbital (días)"
                type="number"
                fullWidth
                placeholder="Ej: 365.25"
                helperText="Tiempo que tarda el planeta en orbitar su estrella"
                value={formData.orbitalPeriod}
                onChange={handleChange('orbitalPeriod')}
              />
              <TextField
                label="Radio del Planeta (radios terrestres)"
                type="number"
                fullWidth
                placeholder="Ej: 1.2"
                helperText="Tamaño del planeta comparado con la Tierra"
                value={formData.planetRadius}
                onChange={handleChange('planetRadius')}
              />
              <TextField
                label="Temperatura Estelar (K)"
                type="number"
                fullWidth
                placeholder="Ej: 5778"
                helperText="Temperatura de la estrella anfitriona"
                value={formData.stellarTemp}
                onChange={handleChange('stellarTemp')}
              />
              <TextField
                label="Profundidad del Tránsito (%)"
                type="number"
                fullWidth
                placeholder="Ej: 0.01"
                helperText="Disminución de brillo durante el tránsito"
                value={formData.transitDepth}
                onChange={handleChange('transitDepth')}
              />

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<Sparkles />}
                onClick={handlePredict}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  py: 1.5,
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    boxShadow: '0 12px 48px rgba(99, 102, 241, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Calcular Predicción
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Resultado de la predicción */}
        <Grid size={{ xs: 12, md: 6 }}>

          <Card
            sx={{
              p: 4,
              background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '2px solid rgba(99, 102, 241, 0.3)',
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Resultado de la Predicción
            </Typography>

            {/* Indicador de probabilidad - EDITA estilos aquí */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  border: '8px solid #6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                }}
              >
                <Box>
                  <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.light' }}>
                    {result.probability}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Probabilidad
                  </Typography>
                </Box>
              </Box>
              
              <Chip
                label={result.classification}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 700,
                  px: 2,
                  py: 2.5,
                }}
              />
            </Box>

            {/* Características predichas - EDITA valores aquí */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Características Predichas:
              </Typography>
              {[
                { label: 'Tipo', value: result.type },
                { label: 'Zona', value: result.zone },
                { label: 'Confianza', value: result.confidence },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1.5,
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Nota informativa - EDITA texto aquí */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                ℹ️ Esta es una predicción de demostración. Para resultados más precisos y 
                entrenar tus propios modelos, crea una cuenta gratuita.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PredictionDemo;