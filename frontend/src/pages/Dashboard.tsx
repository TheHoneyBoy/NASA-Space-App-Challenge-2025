import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Aquí puedes mostrar información del usuario, gráficos, estadísticas, etc.
      </Typography>
    </Box>
  );
};

export default Dashboard;