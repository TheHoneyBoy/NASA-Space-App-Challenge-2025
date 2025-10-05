// src/pages/Home.tsx
import React from 'react';
import Galaxy from '../components/Galaxy';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoHawaHP from '../assets/Logo-HawaHP.png'; // <- Importar logo

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      {/* logo*/}
      <Box
        component="img"
        src={LogoHawaHP}
        alt="Logo HawaHP"
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          width: 160,
          height: 'auto',
          zIndex: 2,
        }}
      />

      {/* background Galaxy */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <Galaxy
          mouseInteraction
          mouseRepulsion
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
        />
      </Box>

      {/* content */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ color: 'white' }}>
          Beyond Hanan Pacha,<br />
          new worlds await...
        </Typography>
<Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
  {/* Botón principal con fondo blanco */}
  <Button
    onClick={() => navigate('/info')}
    sx={{
      py: 1.25,
      px: 3,
      background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
      color: "#061224",
      fontWeight: 600,
      boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
      borderRadius: 2,
      "&:hover": {
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        transform: "translateY(-2px)",
        background: "linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)",
      },
      transition: "all 0.3s ease",
    }}
  >
    Explore as Guest
  </Button>

  {/* Botón transparente con borde, hover blanco */}
  <Button
    onClick={() => navigate('/login')}
    sx={{
      py: 1.25,
      px: 3,
      background: "transparent",
      color: "#ffffff",
      fontWeight: 600,
      border: "2px solid #ffffff",
      borderRadius: 2,
      boxShadow: "0 6px 24px rgba(255,255,255,0.1)",
      "&:hover": {
        boxShadow: "0 8px 32px rgba(255,255,255,0.25)",
        transform: "translateY(-2px)",
        border: "2px solid #ffffff", // Borde cambia a blanco al hacer hover
      },
      transition: "all 0.3s ease",
    }}
  >
    Explore with Account
  </Button>
</Box>



      </Box>
    </Box>
  );
};

export default Home;