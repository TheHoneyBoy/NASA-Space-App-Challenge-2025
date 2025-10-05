import type { TeamMember, TeamInfo } from '../types/team.types';

// ============================================
// DATOS DEL EQUIPO DE HAWA HP
// Edita aquí la información de cada desarrollador
// ============================================

import paul from '../assets/team/paul.jpeg';
import naye from '../assets/team/naye.jpeg';
import gian from '../assets/team/Gian.jpg';
import jady from '../assets/team/jady.jpeg';
import edwin from '../assets/team/Edwin.jpeg';
import yasu from '../assets/team/yasu.jpeg';

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    nombre: "Paul Andre Auccacusi Huanca", // EDITA: Nombre completo
    rol: "Machine Learning Engineer & Backend Developer", // EDITA: Rol en el proyecto
    foto: paul, // EDITA: Ruta de la foto (coloca tus fotos en public/assets/team/)
    
    // Información académica (FLEXIBLE)
    titulo: "Ingeniería Informática y de Sistemas", // EDITA: Para estudiantes: "Ingeniería de..." / Para egresados: "Ingeniero de..."
    estado: "Student", // EDITA: Para estudiantes: "Xto Ciclo" / Para egresados: "Egresado 2023"
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA: Nombre de la universidad
    
    // Redes sociales - EDITA con tus URLs reales
    linkedin: "https://www.linkedin.com/in/paul-andre-auccacusi-huanca/",
    github: "https://github.com/TheHoneyBoy",
    
    // Color único para este desarrollador (NO CAMBIAR a menos que quieras otro color)
    accentColor: "#6366f1" // Índigo
  },
  {
    id: 2,
    nombre: "Nahyely Alaniz Espinoza Colca", // EDITA
    rol: "UX/UI Designer & Frontend Developer", // EDITA
    foto: naye, // EDITA
    titulo: "Ingeniería Informática y de Sistemas", // Ejemplo de egresado
    estado: "Graduate", // Ejemplo de egresado
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://www.linkedin.com/in/nahyely-espinoza-147253323",
    github: "https://github.com/nahyely",
    accentColor: "#8b5cf6" // Púrpura
  },
  {
    id: 3,
    nombre: "Jadyra Ch'aska Choque Quispe", // EDITA
    rol: "Data Analyst", // EDITA
    foto: jady, // EDITA
    titulo: "Ingeniería Informática y de Sistemas", // EDITA
    estado: "Graduate", // EDITA
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://www.linkedin.com/in/jadyra-ch-aska-choque-quispe-451858329",
    github: "https://github.com/Dyri1",
    accentColor: "#06b6d4" // Cyan
  },
  {
    id: 4,
    nombre: "Edwin Alvarez Mamani", // EDITA
    rol: "Developer Full-stack", // EDITA
    foto: edwin, // EDITA
    titulo: "Ingeniería Informática y de Sistemas", // EDITA
    estado: "Titulado", // EDITA
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://www.linkedin.com/in/win7eam/",
    github: "https://github.com/win7/",
    accentColor: "#ec4899" // Rosa
  },
  {
    id: 5,
    nombre: "Gian Franco Charalla Ccama", // EDITA
    rol: "UX/UI Designer & Frontend Developer", // EDITA
    foto: gian, // EDITA
    titulo: "Ingeniería Informática y de Sistemas", // EDITA
    estado: "Student", // EDITA
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://www.linkedin.com/in/gian-franco-charalla-464b42271",
    github: "https://github.com/NXT-CRAZZY",
    accentColor: "#10b981" // Verde
  },
  {
    id: 6,  
    nombre: "Yasumy Maricely Jallo Paccaya", // EDITA
    rol: "Data Scientist", // EDITA
    foto: yasu, // EDITA
    titulo: "Ingeniería Informática y de Sistemas", // Ejemplo de egresada
    estado: "Student", // Ejemplo de egresada
    universidad: "Universidad Nacional de San Antonio Abad del Cusco", // EDITA
    linkedin: "https://www.linkedin.com/in/yasumy-maricely-jallo-paccaya/",
    github: "https://github.com/yib-thv",
    accentColor: "#f59e0b" // Naranja
  },
];

// Información general del equipo
export const teamInfo: TeamInfo = {
  titulo: "The Team Behind HAWA HP",
  subtitulo: "Students and professionals passionate about space and technology",
  descripcion: "A multidisciplinary team dedicated to democratizing knowledge about exoplanets through artificial intelligence."
};
