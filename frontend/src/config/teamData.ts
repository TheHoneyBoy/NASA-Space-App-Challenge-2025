import type { TeamMember, TeamInfo } from '../types/team.types';

// ============================================
// DATOS DEL EQUIPO DE HAWA HP
// Edita aquí la información de cada desarrollador
// ============================================

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    nombre: "Desarrollador Uno", // EDITA: Nombre completo
    rol: "Frontend Developer", // EDITA: Rol en el proyecto
    foto: "/assets/team/dev1.jpg", // EDITA: Ruta de la foto (coloca tus fotos en public/assets/team/)
    
    // Información académica (FLEXIBLE)
    titulo: "Ingeniería de Software", // EDITA: Para estudiantes: "Ingeniería de..." / Para egresados: "Ingeniero de..."
    estado: "5to Ciclo", // EDITA: Para estudiantes: "Xto Ciclo" / Para egresados: "Egresado 2023"
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA: Nombre de la universidad
    
    // Redes sociales - EDITA con tus URLs reales
    linkedin: "https://linkedin.com/in/usuario1",
    github: "https://github.com/usuario1",
    
    // Color único para este desarrollador (NO CAMBIAR a menos que quieras otro color)
    accentColor: "#6366f1" // Índigo
  },
  {
    id: 2,
    nombre: "Desarrollador Dos", // EDITA
    rol: "Backend Developer", // EDITA
    foto: "/assets/team/dev2.jpg", // EDITA
    titulo: "Ingeniero de Software", // Ejemplo de egresado
    estado: "Egresado 2023", // Ejemplo de egresado
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://linkedin.com/in/usuario2",
    github: "https://github.com/usuario2",
    accentColor: "#8b5cf6" // Púrpura
  },
  {
    id: 3,
    nombre: "Desarrollador Tres", // EDITA
    rol: "UI/UX Designer", // EDITA
    foto: "/assets/team/dev3.jpg", // EDITA
    titulo: "Diseño Gráfico", // EDITA
    estado: "6to Ciclo", // EDITA
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://linkedin.com/in/usuario3",
    github: "https://github.com/usuario3",
    accentColor: "#06b6d4" // Cyan
  },
  {
    id: 4,
    nombre: "Desarrollador Cuatro", // EDITA
    rol: "Data Scientist", // EDITA
    foto: "/assets/team/dev4.jpg", // EDITA
    titulo: "Ingeniería de Sistemas", // EDITA
    estado: "7mo Ciclo", // EDITA
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://linkedin.com/in/usuario4",
    github: "https://github.com/usuario4",
    accentColor: "#ec4899" // Rosa
  },
  {
    id: 5,
    nombre: "Gian Franco Charalla Ccama", // EDITA
    rol: "Frontend Developer", // EDITA
    foto: "/assets/team/dev5.jpg", // EDITA
    titulo: "Ingeniería Informática", // EDITA
    estado: "8vo Ciclo", // EDITA
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://www.linkedin.com/in/gian-franco-charalla-464b42271",
    github: "https://github.com/NXT-CRAZZY",
    accentColor: "#10b981" // Verde
  },
  {
    id: 6,
    nombre: "Desarrollador Seis", // EDITA
    rol: "DevOps Engineer", // EDITA
    foto: "/assets/team/dev6.jpg", // EDITA
    titulo: "Ingeniera de Software", // Ejemplo de egresada
    estado: "Egresada 2024", // Ejemplo de egresada
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://linkedin.com/in/usuario6",
    github: "https://github.com/usuario6",
    accentColor: "#f59e0b" // Naranja
  },
];

// Información general del equipo
export const teamInfo: TeamInfo = {
  titulo: "El Equipo Detrás de HAWA HP",
  subtitulo: "Estudiantes y profesionales apasionados por el espacio y la tecnología",
  descripcion: "Un equipo multidisciplinario dedicado a democratizar el conocimiento sobre exoplanetas mediante inteligencia artificial."
};