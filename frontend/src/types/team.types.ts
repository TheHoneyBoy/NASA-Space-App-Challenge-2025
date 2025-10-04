// ============================================
// TYPES PARA EL EQUIPO
// Define los tipos de datos del equipo
// ============================================

export interface TeamMember {
  id: number;
  nombre: string;
  rol: string;
  foto: string;
  titulo: string;
  estado: string;
  universidad: string;
  linkedin: string;
  github: string;
  accentColor: string;
}

export interface TeamInfo {
  titulo: string;
  subtitulo: string;
  descripcion: string;
}