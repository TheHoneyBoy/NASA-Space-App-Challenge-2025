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
  accuracy: 85,
};

// Datasets de NASA disponibles
export const nasaDatasets: NASADataset[] = [
  {
    name: 'Kepler Objects of Interest (KOI)',
    description: 'Data from the Kepler mission with over 2,600 confirmed exoplanets',
    link: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative',
    updated: '2024'
  },
  {
    name: 'K2 Planets and Candidates',
    description: 'Dataset from the K2 mission with candidate and confirmed exoplanets',
    link: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=k2pandc',
    updated: '2024'
  },
  {
    name: 'TESS Objects of Interest (TOI)',
    description: 'Recent data from the Transiting Exoplanet Survey Satellite',
    link: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=TOI',
    updated: '2024'
  },
];

// Features destacados de la plataforma
export const platformFeatures: PlatformFeature[] = [
  { id: 1, text: 'Advanced AI' },
  { id: 2, text: 'Real NASA Data' },
  { id: 3, text: 'Interactive Exploration' },
];

// Información educativa sobre exoplanetas
export const exoplanetInfo: ExoplanetInfo[] = [
  {
    title: 'Habitable Zone',
    desc: 'Region where liquid water can exist on the surface'
  },
  {
    title: 'Detection Methods',
    desc: 'Transit, radial velocity, direct imaging, and microlensing'
  },
  {
    title: 'Types of Exoplanets',
    desc: 'Gas giants, super-Earths, hot Neptunes, and more'
  },
];
// Prediction Process (4 steps)
export const predictionSteps: PredictionStep[] = [
  {
    step: '01',
    title: 'Data Collection',
    desc: 'We gather light curve, planetary transit, and stellar feature data from official databases.'
  },
  {
    step: '02',
    title: 'AI Processing',
    desc: 'Our ML models analyze complex patterns in the data to identify exoplanet signals.'
  },
  {
    step: '03',
    title: 'Probabilistic Analysis',
    desc: 'We calculate the probability that a signal corresponds to a real exoplanet versus a false positive.'
  },
  {
    step: '04',
    title: 'Accurate Results',
    desc: 'We obtain highly accurate predictions (>94%) validated against confirmed data.'
  },
];

// Visualization Data
export const visualizationStats: VisualizationStat[] = [
  { label: 'Stellar Systems', value: '4,123' },
  { label: 'Habitable Zone', value: '342' },
  { label: 'Active Candidates', value: '2,889' },
  { label: 'Confirmed 2024', value: '245' },
];

// Account Benefits
export const accountBenefits: AccountBenefit[] = [
  { text: 'Train custom models' },
  { text: 'Upload your own datasets' },
  { text: 'Save and share results' },
  { text: 'Access to Fine Tuning' },
];

// Footer Links
export const footerLinks: FooterLinks = {
  platform: ['Explore', 'Prediction', 'Training', 'Datasets'],
  resources: ['Documentation', 'API', 'Tutorials', 'Blog'],
};
