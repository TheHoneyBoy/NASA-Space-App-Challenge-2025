// ============================================
// DATOS MOCK PARA LA LANDING PAGE
// Edita estos datos según tus necesidades
// ============================================

// Interfaces
interface DiscoveryDataPoint {
  year: string;
  count: number;
}

interface MissionDataPoint {
  mission: string;
  count: number;
}

interface MainStats {
  exoplanets: number;
  predictions: number;
  accuracy: number;
}

interface NASADataset {
  name: string;
  description: string;
  link: string;
  updated: string;
}

interface PlatformFeature {
  id: number;
  text: string;
}

interface ExoplanetInfo {
  title: string;
  desc: string;
}

interface PredictionStep {
  step: '01' | '02' | '03' | '04';
  title: string;
  desc: string;
}

interface VisualizationStat {
  label: string;
  value: string;
}

interface AccountBenefit {
  text: string;
}

interface FooterLinks {
  platform: string[];
  resources: string[];
}

// Datos para gráfico de descubrimientos por año
export const discoveryData: DiscoveryDataPoint[] = [
  { year: '2014', count: 715 },
  { year: '2016', count: 1284 },
  { year: '2018', count: 95 },
  { year: '2020', count: 320 },
  { year: '2022', count: 178 },
  { year: '2024', count: 245 },
];

// Datos para gráfico de descubrimientos por misión
export const missionData: MissionDataPoint[] = [
  { mission: 'Kepler', count: 2662 },
  { mission: 'TESS', count: 388 },
  { mission: 'K2', count: 512 },
  { mission: 'Others', count: 246 },
];

// Estadísticas principales
export const mainStats: MainStats = {
  exoplanets: 5539,
  predictions: 12847,
  accuracy: 94.7,
};

// Datasets de NASA disponibles
export const nasaDatasets: NASADataset[] = [
  {
    name: 'Kepler Exoplanet Search Results',
    description: 'Datos de la misión Kepler con más de 2,600 exoplanetas confirmados',
    link: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative',
    updated: '2024'
  },
  {
    name: 'K2 Planets and Candidates',
    description: 'Dataset de la misión K2 con candidatos a exoplanetas',
    link: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=k2candidates',
    updated: '2024'
  },
  {
    name: 'TESS Exoplanet Candidates',
    description: 'Datos recientes del Transiting Exoplanet Survey Satellite',
    link: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=TOI',
    updated: '2024'
  },
];

// Features destacados de la plataforma
export const platformFeatures: PlatformFeature[] = [
  { id: 1, text: 'IA Avanzada' },
  { id: 2, text: 'Datos Reales NASA' },
  { id: 3, text: 'Exploración Interactiva' },
];

// Información educativa sobre exoplanetas
export const exoplanetInfo: ExoplanetInfo[] = [
  {
    title: 'Zona Habitable',
    desc: 'Región donde puede existir agua líquida en la superficie'
  },
  {
    title: 'Métodos de Detección',
    desc: 'Tránsito, velocidad radial, imagen directa y microlentes'
  },
  {
    title: 'Tipos de Exoplanetas',
    desc: 'Gigantes gaseosos, súper-Tierras, Neptunos calientes y más'
  },
];

// Proceso de predicción (4 pasos)
export const predictionSteps: PredictionStep[] = [
  {
    step: '01',
    title: 'Recolección de Datos',
    desc: 'Obtenemos datos de curvas de luz, tránsitos planetarios y características estelares de bases de datos oficiales'
  },
  {
    step: '02',
    title: 'Procesamiento con IA',
    desc: 'Nuestros modelos de ML analizan patrones complejos en los datos para identificar señales de exoplanetas'
  },
  {
    step: '03',
    title: 'Análisis Probabilístico',
    desc: 'Calculamos la probabilidad de que una señal corresponda a un exoplaneta verdadero vs. un falso positivo'
  },
  {
    step: '04',
    title: 'Resultados Precisos',
    desc: 'Obtenemos predicciones con alta precisión (>94%) validadas contra datos confirmados'
  },
];

// Datos de visualización
export const visualizationStats: VisualizationStat[] = [
  { label: 'Sistemas Estelares', value: '4,123' },
  { label: 'Zona Habitable', value: '342' },
  { label: 'Candidatos Activos', value: '2,889' },
  { label: 'Confirmados 2024', value: '245' },
];

// Beneficios de crear cuenta
export const accountBenefits: AccountBenefit[] = [
  { text: 'Entrena modelos personalizados' },
  { text: 'Sube tus propios datasets' },
  { text: 'Guarda y comparte resultados' },
  { text: 'Acceso a Fine Tuning' },
];

// Enlaces del footer
export const footerLinks: FooterLinks = {
  platform: ['Explorar', 'Predicción', 'Entrenamiento', 'Datasets'],
  resources: ['Documentación', 'API', 'Tutoriales', 'Blog'],
};