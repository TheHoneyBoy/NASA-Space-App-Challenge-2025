// ============================================
// CONFIGURACIÓN DE IMÁGENES
// Cambia las URLs de las imágenes aquí
// ============================================

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
  astronaut: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
  
  // Planeta para sección "¿Qué son los exoplanetas?"
  exoplanet: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80',
  
  // Cerebro/IA para sección "Cómo funciona"
  aiConcept: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  
  // Telescopio/satélite para sección de datasets
  telescope: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
  
  // Sistema solar para visualización
  solarSystem: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80',
};

export default IMAGES;