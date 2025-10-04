import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { teamInfo } from '../../config/teamData';

// ============================================
// HERO SECTION - Página del Equipo
// Edita: título, subtítulo en teamData.ts
// ============================================

const TeamHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '80vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.95) 0%, rgba(26, 26, 46, 0.98) 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Efecto de fondo con partículas */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Estrellas animadas */}
      {[...Array(30)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            bgcolor: 'white',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
            '@keyframes twinkle': {
              '0%, 100%': { opacity: 0.3 },
              '50%': { opacity: 1 },
            },
          }}
        />
      ))}
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Botón de regreso */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            startIcon={<ArrowLeft size={20} />}
            onClick={() => navigate('/info')}
            sx={{
              mb: 4,
              color: 'text.secondary',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'rgba(99, 102, 241, 0.1)',
              },
            }}
          >
            Atrás
          </Button>
        </motion.div>

        <Box sx={{ textAlign: 'center', py: 6 }}>
          {/* Icono principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Users size={64} color="#6366f1" style={{ marginBottom: 24 }} />
          </motion.div>

          {/* Título principal - EDITA EN teamData.ts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(99, 102, 241, 0.5)',
              }}
            >
              {teamInfo.titulo}
            </Typography>
          </motion.div>

          {/* Subtítulo - EDITA EN teamData.ts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              {teamInfo.subtitulo}
            </Typography>
          </motion.div>

          {/* Descripción adicional - EDITA EN teamData.ts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.8,
              }}
            >
              {teamInfo.descripcion}
            </Typography>
          </motion.div>
        </Box>
      </Container>

      {/* Indicador de scroll */}
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

export default TeamHero;