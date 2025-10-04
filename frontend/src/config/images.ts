// ============================================
// CONFIGURACIÓN DE IMÁGENES
// Cambia las URLs de las imágenes aquí
// ============================================
import predImage from '../assets/pred.png';
import telescope from '../assets/kepler.png';
import exoplanet from '../assets/exoplaneta.png';
import astronaut from '../assets/astronaut.png';

interface Images {
  heroBackground: string;
  astronaut: string;
  exoplanet: string;
  aiConcept: string;
  telescope: string;
  solarSystem: string;
}

const IMAGES: Images = {
  // Hero Section - Imagen principal de fondo
  heroBackground: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1920&q=80',
  
  // Astronauta flotante en sección de introducción
  astronaut: astronaut,
  
  // Planeta para sección "¿Qué son los exoplanetas?"
  exoplanet: exoplanet,
  
  // Cerebro/IA para sección "Cómo funciona"
  aiConcept: predImage, // ahora funciona
  
  // Telescopio/satélite para sección de datasets
  telescope: telescope,
  
  // Sistema solar para visualización
  solarSystem: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80',
};

export default IMAGES;