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
  title = 'Quick Exoplanet Prediction',
  subtitle = 'Enter some basic data and see how our AI predicts the probability of an exoplanet',
  overline = 'Try Our AI',
}) => {

  const [formData, setFormData] = useState<FormData>({
    orbitalPeriod: '',
    planetRadius: '',
    stellarTemp: '',
    transitDepth: '',
  });

  const [result, setResult] = useState<PredictionResult>({
    probability: 87.3,
    classification: 'PROBABLE EXOPLANET',
    type: 'Super-Earth',
    zone: 'Habitable',
    confidence: 'High',
  });


  // Maneja cambios en los inputs
  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Simulate prediction - EDIT logic here
  const handlePredict = () => {
    // Simple simulation based on values
    const randomProb = Math.random() * 40 + 60; // Between 60% and 100%
    setResult({
      probability: parseFloat(randomProb.toFixed(1)),
      classification: randomProb > 75 ? 'PROBABLE EXOPLANET' : 'POSSIBLE EXOPLANET',
      type: randomProb > 80 ? 'Super-Earth' : 'Hot Jupiter',
      zone: randomProb > 70 ? 'Habitable' : 'Non-Habitable',
      confidence: randomProb > 85 ? 'High' : 'Medium',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        {/* Overline - EDIT via props */}
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2 }}
        >
          {overline}
        </Typography>

        {/* Title - EDIT via props */}
        <Typography variant="h2" sx={{ mt: 2, mb: 2 }}>
          {title}
        </Typography>

        {/* Subtitle - EDIT via props */}
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


      <Grid container spacing={6} alignItems="center">
        {/* Prediction Form */}
        <Grid size={{ xs: 12, md: 6 }}>

          <Card sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Input Data
            </Typography>
            
            {/* Form fields - EDIT labels and helpers here */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Orbital Period (days)"
                type="number"
                fullWidth
                placeholder="Ex: 365.25"
                helperText="Time it takes for the planet to orbit its star"
                value={formData.orbitalPeriod}
                onChange={handleChange('orbitalPeriod')}
              />
              <TextField
                label="Planet Radius (Earth radii)"
                type="number"
                fullWidth
                placeholder="Ex: 1.2"
                helperText="Planet size compared to Earth"
                value={formData.planetRadius}
                onChange={handleChange('planetRadius')}
              />
              <TextField
                label="Stellar Temperature (K)"
                type="number"
                fullWidth
                placeholder="Ex: 5778"
                helperText="Temperature of the host star"
                value={formData.stellarTemp}
                onChange={handleChange('stellarTemp')}
              />
              <TextField
                label="Transit Depth (%)"
                type="number"
                fullWidth
                placeholder="Ex: 0.01"
                helperText="Brightness drop during transit"
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
                Calculate Prediction
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Prediction Result */}
        <Grid size={{ xs: 12, md: 6 }}>

          <Card
            sx={{
              p: 4,
              background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '2px solid rgba(99, 102, 241, 0.3)',
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Prediction Result
            </Typography>

            {/* Probability Indicator - EDIT styles here */}
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
                    Probability
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

            {/* Predicted Features - EDIT values here */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Predicted Features:
              </Typography>
              {[
                { label: 'Type', value: result.type },
                { label: 'Zone', value: result.zone },
                { label: 'Confidence', value: result.confidence },
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

            {/* Informational Note - EDIT text here */}
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
                ℹ️ This is a demo prediction. For more accurate results and to train your own models,
                create a free account.
              </Typography>
            </Box>


          </Card>
        </Grid>
      </Grid>

    </motion.div>
    </Container>
  );
};

export default PredictionDemo;