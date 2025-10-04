import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

import { Container, Grid, Typography, Box, TextField, Button, Link } from '@mui/material';
import { Rocket, Globe } from 'lucide-react';
import { footerLinks } from '../../config/mockData.ts';

// ============================================
// INTERFACES Y TIPOS
// ============================================

/**
 * Estructura de enlaces del footer
 */
interface FooterLinksStructure {
  platform: string[];
  resources: string[];
}

/**
 * Estructura de un enlace de red social
 */
interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

/**
 * Props del componente Footer
 * Opcional: permite personalizar textos y enlaces
 */
interface FooterProps {
  /** Nombre de la empresa/proyecto */
  brandName?: string;
  /** Descripción/tagline de la empresa */
  brandDescription?: string;
  /** Año del copyright */
  copyrightYear?: number;
  /** Texto adicional del copyright */
  copyrightText?: string;
  /** Enlaces de redes sociales */
  socialLinks?: SocialLink[];
  /** Enlaces del footer (plataforma y recursos) */
  links?: FooterLinksStructure;
  /** Callback al enviar el newsletter */
  onNewsletterSubmit?: (email: string) => void;
  /** Mostrar sección de newsletter */
  showNewsletter?: boolean;
}

// ============================================
// FOOTER
// Edita: enlaces, información de contacto
// ============================================

const Footer: React.FC<FooterProps> = ({
  brandName = 'HAWA HP',
  brandDescription = 'Más allá del cielo. Explorando el universo de los exoplanetas con inteligencia artificial.',
  copyrightYear = new Date().getFullYear(),
  copyrightText = 'Todos los derechos reservados. | Datos proporcionados por NASA Exoplanet Archive',
  socialLinks = [],
  links = footerLinks,
  onNewsletterSubmit,
  showNewsletter = true,
}) => {
  // Estado para el email del newsletter
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Maneja el cambio en el input de email
   * @param event - Evento del input
   */
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  /**
   * Maneja el envío del formulario de newsletter
   * @param event - Evento del formulario
   */
  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    // Validación básica
    if (!email || !email.includes('@')) {
      console.error('Email inválido');
      return;
    }

    setIsSubmitting(true);

    try {
      if (onNewsletterSubmit) {
        await onNewsletterSubmit(email);
      } else {
        // EDITA AQUÍ: Implementa tu lógica de envío
        console.log('Newsletter subscription:', email);
        // Ejemplo: await api.subscribeNewsletter(email);
      }
      
      // Limpiar input después de enviar
      setEmail('');
      // Aquí podrías mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al suscribirse:', error);
      // Aquí podrías mostrar un mensaje de error
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Maneja el click en un enlace del footer
   * @param linkText - Texto del enlace clickeado
   * @param section - Sección del footer (platform o resources)
   */
  const handleLinkClick = (linkText: string, section: string): void => {
    console.log(`Footer link clicked: ${section} - ${linkText}`);
    // EDITA AQUÍ: Añade tracking analytics
    // analytics.track('footer_link_clicked', { link: linkText, section });
  };

  return (
    <Box 
      component="footer"
      sx={{ 
        bgcolor: '#0a0a0f', 
        py: 8, 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Columna 1: Información de HAWA HP */}
          <Grid size={{ xs: 12, md: 4 }}>

            {/* Logo y nombre de marca - EDITA mediante props */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rocket size={32} color="#6366f1" />
              <Typography 
                variant="h5" 
                component="h2"
                sx={{ fontWeight: 700 }}
              >
                {brandName}
              </Typography>
            </Box>

            {/* Descripción de la marca - EDITA mediante props */}
            <Typography 
              variant="body2"
              component="p"
              sx={{ 
                color: 'text.secondary', 
                mb: 2, 
                lineHeight: 1.8,
                maxWidth: '300px',
              }}
            >
              {brandDescription}
            </Typography>

            {/* Redes sociales - EDITA mediante props socialLinks */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialLinks.length > 0 ? (
                socialLinks.map((social: SocialLink) => (
                  <Box
                    key={social.name}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    sx={{
                      color: 'text.secondary',
                      transition: 'color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {social.icon}
                  </Box>
                ))
              ) : (
                // Icono por defecto si no hay redes sociales
                <Box
                  component="a"
                  href="#"
                  aria-label="Website"
                  sx={{
                    color: 'text.secondary',
                    transition: 'color 0.3s',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  <Globe size={20} />
                </Box>
              )}
            </Box>
          </Grid>

          
          {/* Nueva columna - AGREGA ESTO */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>
              Acerca de
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/team"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Conoce al Equipo
              </Link>
              
            </Box>
          </Grid>

        {
          /* Columna 2: Enlaces de plataforma - EDITA EN mockData.ts
          
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ mb: 2, fontSize: '1rem', fontWeight: 600 }}
            >
              Plataforma
            </Typography>
            <Box 
              component="nav"
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              {links.platform.map((link: string) => (
                <Link
                  key={link}
                  href="#"
                  onClick={() => handleLinkClick(link, 'platform')}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                    '&:hover': { 
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>
          */
        }


          {/* Columna 3: Enlaces de recursos - EDITA EN mockData.ts */}
          <Grid size={{ xs: 6, md: 2 }}>

            <Typography 
              variant="h6" 
              component="h3"
              sx={{ mb: 2, fontSize: '1rem', fontWeight: 600 }}
            >
              Recursos
            </Typography>
            <Box 
              component="nav"
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              {links.resources.map((link: string) => (
                <Link
                  key={link}
                  href="#"
                  onClick={() => handleLinkClick(link, 'resources')}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                    '&:hover': { 
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Columna 4: Newsletter - EDITA showNewsletter para ocultar */}
          {showNewsletter && (
            <Grid size={{ xs: 12, md: 4 }}>

              <Typography 
                variant="h6" 
                component="h3"
                sx={{ mb: 2, fontSize: '1rem', fontWeight: 600 }}
              >
                Newsletter
              </Typography>
              <Typography 
                variant="body2"
                component="p"
                sx={{ 
                  color: 'text.secondary', 
                  mb: 2, 
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                }}
              >
                Recibe las últimas noticias sobre exoplanetas y actualizaciones de la plataforma
              </Typography>
              
              {/* Formulario de newsletter */}
              <Box 
                component="form"
                onSubmit={handleNewsletterSubmit}
                sx={{ display: 'flex', gap: 1 }}
              >
                <TextField
                  type="email"
                  size="small"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  disabled={isSubmitting}
                  sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    // EDITA AQUÍ: Cambia el gradiente del botón
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    minWidth: '80px',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5558e3 0%, #7c4de8 100%)',
                    },
                    '&:disabled': {
                      background: 'rgba(99, 102, 241, 0.5)',
                    },
                  }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Copyright - EDITA mediante props */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="body2" 
            component="p"
            sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
          >
            © {copyrightYear} {brandName}. {copyrightText}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

// ============================================
// EJEMPLO DE USO:
// ============================================
// import Footer from './Footer';
// import { Github, Twitter, Linkedin } from 'lucide-react';
//
// <Footer 
//   brandName="Mi Proyecto"
//   brandDescription="Descripción personalizada"
//   copyrightYear={2025}
//   socialLinks={[
//     { name: 'GitHub', url: 'https://github.com/...', icon: <Github size={20} /> },
//     { name: 'Twitter', url: 'https://twitter.com/...', icon: <Twitter size={20} /> },
//   ]}
//   onNewsletterSubmit={async (email) => {
//     await api.subscribe(email);
//   }}
//   showNewsletter={true}
// />
// ============================================