import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { Globe, Brain, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mainStats, discoveryData, missionData } from '../../config/mockData.ts';

// ============================================
// INTERFACES
// ============================================

interface Stats {
  exoplanets: number;
  predictions: number;
  accuracy: number;
}

interface StatCardConfig {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}
/*
interface ChartDataPoint {
  year?: number;
  count: number;
  mission?: string;
}
*/

interface StatisticsProps {
  title?: string;
  overline?: string;
}

// ============================================
// SECCIÓN: ESTADÍSTICAS DINÁMICAS
// Edita: números, gráficos en mockData.ts
// ============================================
const Statistics: React.FC<StatisticsProps> = ({
  title = 'Universe Statistics',
  overline = 'Real-Time Data',
}) => {

  const [stats, setStats] = useState<Stats>({
    exoplanets: 0,
    predictions: 0,
    accuracy: 0,
  });

  // Animación de contador para estadísticas
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(mainStats);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Main cards configuration - EDIT HERE
  const statsConfig: StatCardConfig[] = [
    {
      value: stats.exoplanets.toLocaleString(),
      label: 'Confirmed Exoplanets',
      icon: <Globe size={40} />,
      color: '#6366f1'
    },
    {
      value: stats.predictions.toLocaleString(),
      label: 'Predictions Made',
      icon: <Brain size={40} />,
      color: '#8b5cf6'
    },
    {
      value: `${stats.accuracy}%`,
      label: 'Model Accuracy',
      icon: <TrendingUp size={40} />,
      color: '#06b6d4'
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          {/* Overline - EDITA mediante props */}
          <Typography
            variant="overline"
            sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 2 }}
          >
            {overline}
          </Typography>

          {/* Título - EDITA mediante props */}
          <Typography variant="h2" sx={{ mt: 2 }}>
            {title}
          </Typography>
        </Box>

        {/* Cards de estadísticas principales - EDITA en statsConfig */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {statsConfig.map((stat: StatCardConfig, idx: number) => (
            <Grid size={{ xs: 12, sm: 4 }} key={idx}>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    // EDITA: efecto hover aquí
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px ${stat.color}40`,
                    },
                  }}
                >
                  <Box sx={{ color: stat.color, mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}aa 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        {/* Charts - EDIT data in mockData.ts */}
        <Grid container spacing={4}>
          {/* Discoveries by Year Chart */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Discoveries by Year
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={discoveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: 8,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Discoveries by Mission Chart */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Discoveries by Mission
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={missionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="mission" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};


export default Statistics;