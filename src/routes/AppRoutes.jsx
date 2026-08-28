<<<<<<< HEAD
// src/routes/AppRoutes.jsx
import React from 'react';
=======
>>>>>>> develop
import { Routes, Route } from "react-router-dom";

// Pages (features)
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import { RutaProtegida } from "../components/RutaProtegida";
import { RutaPublica } from "../components/RutaPublica";
import LandingPage from "../features/landing/pages/LandingPage";
import { LibroDetalle } from "../features/libro/LibroDetalle";
<<<<<<< HEAD
import  MisPrestamos  from "../features/prestamos/MisPrestamos";
=======
import Catalogo from "../features/catalogo/pages/Catalogo";
import UsuarioLayout from "../layouts/UsuarioLayout";
import { RutaPorRol } from "../components/RutaPorRol";
import { LayoutSegunRol } from "./LayoutSegunRol";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
>>>>>>> develop

export default function AppRoutes() {
  return (
<<<<<<< HEAD
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
=======
    <div className="bg-bg w-">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage/>}>
          <Route path="MarketinLayout" element={<></>} /> //queda para importar MarketingLayout
          <Route path="precios" element={<></>} /> //queda para importar PreciosPage
          <Route path="contacto" element={<></>} /> //queda para importar ContactoPage
        </Route>
        <Route element={<RutaPublica />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Route>
        <Route path="/libro" element={<LibroDetalle/>} />

        <Route path="*" element={<h1>404 Not Found</h1>} />

        {/* Rutas protegidas */}
        <Route element={<RutaProtegida />}>
          {/* Compartida por todos los roles, sidebar según corresponda */}
          <Route element={<LayoutSegunRol />}>
            <Route path="/catalogo" element={<Catalogo/>} />
            <Route path="/perfil" element={<></>} />
          </Route>

          <Route element={<RutaPorRol rolesPermitidos={["super-admin"]} />}>
            <Route element={<SuperAdminLayout />}>
              <Route path="/plataforma" element={<></>} />
              <Route path="/organizaciones" element={<></>} />
              <Route path="/planes" element={<></>} />
              <Route path="/auditoria" element={<></>} />
            </Route>
          </Route>


          {/* Rutas solo de admin / super-admin */}
          <Route element={<RutaPorRol rolesPermitidos={["super-admin", "admin"]} />}>
            <Route element={<LayoutSegunRol />}>// "Rutas solo admin" es un layout que contiene un sidebar con links a las rutas de admin
              <Route path="/panel" element={<></>} />
              <Route path="/gestion-catalogo" element={<></>} />
              <Route path="/allprestamos" element={<></>} />
              <Route path="/usuarios" element={<></>} />
              <Route path="/reportes" element={<></>} />
              <Route path="/configuracion" element={<></>} />
            </Route>
          </Route>

          {/* Rutas de usuario normal (lector) */}
          <Route element={<RutaPorRol rolesPermitidos={["lector"]} />}>
            <Route element={<UsuarioLayout/>}>
              <Route path="/prestamos" element={<></>} />// Esta ruta es para que un usuario vea sus prestamos
              <Route path="/prestamos/nuevo" element={<></>} />// Esta ruta es para un usuario cree un nuevo préstamo
              <Route path="/reportar" element={<></>} /> // Esta ruta es para que un usuario vea reporte un problema
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
>>>>>>> develop
  );
}