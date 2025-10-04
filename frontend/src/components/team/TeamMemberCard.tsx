import React from 'react';
import { Box, Card, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Linkedin, Github, GraduationCap, Briefcase } from 'lucide-react';
import type { TeamMember } from '../../types/team.types';

// ============================================
// CARD DE MIEMBRO DEL EQUIPO
// Muestra la información de cada desarrollador
// ============================================

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  // Alternar el layout (foto izquierda/derecha)
  const isEven = index % 2 === 0;

  // Determinar si es estudiante o egresado
  const isGraduated = member.estado.toLowerCase().includes('egresado');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card
        sx={{
          p: 4,
          mb: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' },
          gap: 4,
          alignItems: 'center',
          position: 'relative',
          overflow: 'visible',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 40px ${member.accentColor}40`,
          },
        }}
      >
        {/* Foto del desarrollador */}
        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 200, sm: 250 },
                height: { xs: 200, sm: 250 },
                borderRadius: 4,
                overflow: 'hidden',
                border: `4px solid ${member.accentColor}`,
                boxShadow: `0 8px 32px ${member.accentColor}40`,
              }}
            >
              <Box
                component="img"
                src={member.foto}
                alt={member.nombre}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  // Imagen por defecto si no se encuentra la foto
                  e.currentTarget.src = '/assets/team/default-avatar.jpg';
                }}
              />
              
              {/* Overlay con efecto hover */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, ${member.accentColor}00 0%, ${member.accentColor}40 100%)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              />
            </Box>
          </motion.div>
        </Box>

        {/* Información del desarrollador */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: isEven ? 'left' : 'right' } }}>
          {/* Nombre */}
          <Typography
            variant="h3"
            sx={{
              mb: 1,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${member.accentColor} 0%, ${member.accentColor}aa 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {member.nombre}
          </Typography>

          {/* Rol */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              mb: 3,
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: `${member.accentColor}20`,
              border: `1px solid ${member.accentColor}40`,
            }}
          >
            <Briefcase size={18} color={member.accentColor} />
            <Typography
              variant="h6"
              sx={{
                color: member.accentColor,
                fontWeight: 600,
              }}
            >
              {member.rol}
            </Typography>
          </Box>

          {/* Información académica */}
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, justifyContent: { xs: 'center', md: isEven ? 'flex-start' : 'flex-end' } }}>
              <GraduationCap size={20} color={member.accentColor} />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {member.titulo}
              </Typography>
            </Box>
            
            {/* Estado (Ciclo o Egresado) */}
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.95rem',
              }}
            >
              {member.estado}
            </Typography>
          </Box>

          {/* Universidad */}
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: 'text.secondary',
              fontSize: '1rem',
              fontStyle: 'italic',
            }}
          >
            {member.universidad}
          </Typography>

          {/* Enlaces de redes sociales */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: { xs: 'center', md: isEven ? 'flex-start' : 'flex-end' },
            }}
          >
            {/* LinkedIn */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                component="a"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: 'rgba(10, 102, 194, 0.1)',
                  border: '2px solid rgba(10, 102, 194, 0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(10, 102, 194, 0.2)',
                    borderColor: '#0A66C2',
                    boxShadow: '0 4px 16px rgba(10, 102, 194, 0.4)',
                  },
                }}
              >
                <Linkedin size={24} color="#0A66C2" />
              </IconButton>
            </motion.div>

            {/* GitHub */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                component="a"
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                    boxShadow: '0 4px 16px rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <Github size={24} color="white" />
              </IconButton>
            </motion.div>
          </Box>
        </Box>

        {/* Badge de identificación */}
        <Box
          sx={{
            position: 'absolute',
            top: -15,
            left: isEven ? 30 : 'auto',
            right: isEven ? 'auto' : 30,
            bgcolor: member.accentColor,
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontSize: '0.85rem',
            fontWeight: 700,
            boxShadow: `0 4px 12px ${member.accentColor}60`,
          }}
        >
          #{member.id}
        </Box>
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;