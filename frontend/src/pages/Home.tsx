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
          starSpeed={0.3}
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
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/info')}
          >
            Explore as Guest
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/login')}
          >
            Explore with Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;