import React from 'react';
import { Box, Typography } from '@mui/material';

const Info: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Información
      </Typography>
      <Typography variant="body1">
        Esta sección puede contener información sobre tu app, proyectos, servicios o cualquier detalle adicional.
      </Typography>
    </Box>
  );
};

export default Info;