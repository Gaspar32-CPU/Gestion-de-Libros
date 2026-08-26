// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from "react-router-dom";

// Pages (features)
import Login from "../features/auth/pages/login";
import { RutaProtegida } from "../components/RutaProtegida";
import LandingPage from "../features/landing/pages/LandingPage";
import { LibroDetalle } from "../features/libro/LibroDetalle";
import  MisPrestamos  from "../features/prestamos/MisPrestamos";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />}>
        <Route index element={<></>} />
        <Route path="precios" element={<></>} />
        <Route path="contacto" element={<></>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/libro" element={<LibroDetalle />} />
      <Route path="/register" element={<Login />} />
      <Route path="/catalogo" element={<></>} />
      <Route path="/catalogo/:id" element={<></>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />

      {/* Rutas protegidas */}
      <Route element={<RutaProtegida />}>
        {/* Rutas solo de admin */}
        <Route element={<></>}>
          <Route path="/usuarios" element={<></>} />
          <Route path="/libros" element={<></>} />
          <Route path="/libros/:id" element={<></>} />
          <Route path="/libros/:id/editar" element={<></>} />
          <Route path="/libros/nuevo" element={<></>} />
          <Route path="/prestamos" element={<></>} />
        </Route>
        
        {/* Rutas de usuario normal */}
        <Route path="/perfil" element={<>Perfil</>} />
        <Route path="/prestamos/nuevo" element={<></>} />
        <Route path="/mis-prestamos" element={<MisPrestamos />} />

        <Route path="/dashboard" element={<>Dashboard</>} />
      </Route>
    </Routes>
  );
}