import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  ButtonBase,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { Database, Brain, BarChart3, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { DashboardContent } from '../config/mockData.ts';
import LogoHawaHP from '../assets/Logo-HawaHP.png';
import Planet from '../assets/planet.png'; // 🔹 importa tu imagen completa del planeta
import theme from '../themeGUEST.ts';
import Chatbot from '../components/Chatbot';

// ============================================
// INTERFACES
// ============================================
interface MenuItems {
  step: string;
  title: string;
  desc: string;
  link?: string;
}

interface DashboardMenuProps {
  title?: string;
  subtitle?: string;
  overline?: string;
  steps?: MenuItems[];
}

// ============================================
// DASHBOARD MENU
// ============================================
const DashboardMenu: React.FC<DashboardMenuProps> = ({
  title = 'What will our mission be today?',
  subtitle = 'Our system uses machine learning algorithms trained with real data from space missions such as Kepler, TESS, and K2',
  overline = 'Intelligent Technology',
  steps = DashboardContent,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Determina si estamos en una subruta
  const isSubRoute =
    location.pathname !== '/dashboardMenu' &&
    location.pathname !== '/dashboardMenu/';

  // 🔹 Crear versión secundaria del tema
  const secondaryTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: theme.palette.secondary,
    },
  });

  const iconMap: Record<string, React.ReactNode> = {
    '03': <Database size={32} />,
    '04': <Brain size={32} />,
    '01': <BarChart3 size={32} />,
    '02': <TrendingUp size={32} />,
  };

  return (
    <ThemeProvider theme={secondaryTheme}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: '100vw',
          minHeight: '100vh',
          height: 'auto',
          py: 12,
          px: { xs: 2, sm: 6, md: 10 },
          position: 'relative', // ✅ necesario para el posicionamiento absoluto del planeta
          overflow: 'hidden', // ✅ evita que se desborde el planeta
          backgroundImage: `radial-gradient(circle at bottom, #1c3b82ff 0%, #1a1a1a 100%)`,
        }}
      >
        {/* Logo */}
        {!isSubRoute && (
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
        )}

        {/* Mostrar dashboard principal solo si no es subruta */}
        {!isSubRoute ? (
          <>
            {/* Encabezado */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: 2,
                }}
              >
                {overline}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1.5,
                  mt: 2,
                  mb: 2,
                }}
              >
                <Typography
                  component="span"
                  sx={{ fontSize: '2.3rem', filter: 'brightness(0) invert(1)' }}
                >
                  🚀
                </Typography>
                <Typography variant="h2">{title}</Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  maxWidth: '700px',
                  mx: 'auto',
                  fontSize: '1.1rem',
                }}
              >
                {subtitle}
              </Typography>
            </Box>

            {/* Tarjetas redireccionables */}
            <Grid container spacing={4} justifyContent="center">
              {steps.map((item: MenuItems, idx: number) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ButtonBase
                      onClick={() => {
                        if (item.link && item.link.startsWith('http')) {
                          window.open(item.link, '_blank');
                        } else if (item.link) {
                          navigate(`/dashboardMenu/${item.link}`);
                        }
                      }}
                      sx={{
                        width: '100%',
                        borderRadius: 4,
                        textAlign: 'left',
                      }}
                    >
                      <Card
                        sx={{
                          p: 3,
                          height: '100%',
                          width: '100%',
                          textAlign: 'center',
                          position: 'relative',
                          overflow: 'visible',
                          borderRadius: 4,
                          backgroundImage:
                            'linear-gradient(145deg, rgba(6,182,212,0.1) 0%, rgba(99,102,241,0.05) 100%)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 40px rgba(6,182,212,0.3)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -20,
                            left: 20,
                            bgcolor: 'primary.main',
                            color: 'white',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 12px rgba(6,182,212,0.4)',
                          }}
                        >
                          {item.step}
                        </Box>

                        <Box sx={{ color: 'primary.light', mb: 2, mt: 2 }}>
                          {iconMap[item.step]}
                        </Box>

                        <Typography variant="h6" sx={{ mb: 1.5 }}>
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          {item.desc}
                        </Typography>
                      </Card>
                    </ButtonBase>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          // Si es subruta, renderiza solo el componente hijo
          <Outlet />
        )}
        <Chatbot />
        {/* Imagen del planeta (mitad superior, al fondo) */}
<Box
  component="img"
  src={Planet}
  alt="Planeta decorativo"
  sx={{
    position: "fixed",   // 🔹 Fijo a la ventana
    bottom: 0,           // 🔹 Pegado al borde inferior
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 900,       // ajusta el tamaño del planeta
    opacity: 0.35,       // un poco transparente
    zIndex: 0,           // 🔹 Debajo de todo el contenido
    pointerEvents: "none", // no interfiere con clics
  }}
/>
      </Container>
    </ThemeProvider>
  );
};

export default DashboardMenu;