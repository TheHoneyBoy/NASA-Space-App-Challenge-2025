import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import GuestLanding from '../pages/GuestLanding';
import TeamPage from '../pages/TeamPage';
import DashboardMenu from '../pages/DashboardMenu';
import BatchPrediccion from '../pages/sections/BatchPrediction.tsx';
import ModelTraining from '../pages/sections/ModelTraining.tsx';

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Ruta principal - Home */}
    <Route path="/" element={<Home />} />

    {/* Landing del invitado - antes era /info */}
    <Route path="/info" element={<GuestLanding />} />

    {/* NUEVA RUTA - Página del equipo */}
    <Route path="/team" element={<TeamPage />} />
    {/* Rutas existentes */}
    
    <Route path="/login" element={<Login />} />
    <Route path="/dashboardMenu" element={<DashboardMenu />}>
      {/* Subruta de predicciones */}
      <Route path="predictions" element={<BatchPrediccion />} />
      <Route path="training" element={<ModelTraining />} />
    </Route>
  </Routes>
);

export default AppRoutes;