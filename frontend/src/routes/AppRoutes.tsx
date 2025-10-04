import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import GuestLanding from '../pages/GuestLanding';
import TeamPage from '../pages/TeamPage';


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
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;