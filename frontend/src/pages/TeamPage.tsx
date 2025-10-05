import React from 'react';
import { Box, Container, ThemeProvider, CssBaseline } from '@mui/material';
import TeamHero from '../components/team/TeamHero';
import TeamMemberCard from '../components/team/TeamMemberCard';
import Footer from '../components/guest/Footer';
import { teamMembers } from '../config/teamData';
import theme from '../themeGUEST';

// ============================================
// PÁGINA DEL EQUIPO
// Muestra todos los miembros del equipo
// ============================================

const TeamPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'background.default',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        {/* Hero Section */}
        <TeamHero />

        {/* Sección de miembros del equipo */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default TeamPage;