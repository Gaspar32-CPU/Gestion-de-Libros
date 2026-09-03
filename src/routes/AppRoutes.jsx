// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Páginas
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import LandingPage from "../features/landing/pages/LandingPage";
import { LibroDetalle } from "../features/libro/LibroDetalle";
import  MisPrestamos  from "../features/prestamos/MisPrestamos";
import TodosLosPrestamos from "../features/prestamos/TodosLosPrestamos";
import Catalogo from "../features/catalogo/pages/Catalogo";
import { Usuario } from "../features/usuarios/pages/Usuario";
import GestionCatalogo from "../features/catalogo/pages/GestionCatalogo";

// Componentes
import { RutaProtegida } from "../components/RutaProtegida";
import { RutaPublica } from "../components/RutaPublica";
import { RutaPorRol } from "../components/RutaPorRol";

// Layouts
import UsuarioLayout from "../layouts/UsuarioLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import { LayoutSegunRol } from "./LayoutSegunRol";
import PrestamoExitoso from "../features/prestamos/components/PrestamoExitoso";

export default function AppRoutes() {
  return (
    <div className="bg-bg w-full">
      <Routes>

        {/* ==================== */}
        {/* RUTAS PÚBLICAS       */}
        {/* ==================== */}

        <Route path="/" element={<LandingPage />}>
          <Route path="MarketinLayout" element={<></>} />
          <Route path="precios" element={<></>} />
          <Route path="contacto" element={<></>} />
        </Route>

        <Route element={<RutaPublica />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/libro/:id" element={<LibroDetalle/>} />

        <Route path="/libro" element={<LibroDetalle />} />


        {/* ==================== */}
        {/* RUTAS PROTEGIDAS     */}
        {/* ==================== */}

        <Route element={<RutaProtegida />}>

          {/* Rutas compartidas */}
          <Route element={<LayoutSegunRol />}>
            {/* El catálogo es por organización: el super-admin no pertenece a ninguna */}
            <Route element={<RutaPorRol rolesPermitidos={["admin", "lector"]} redirectTo="/plataforma" />}>
              <Route path="/catalogo" element={<Catalogo/>} />
            </Route>
            <Route path="/perfil" element={<></>} />
          </Route>


          {/* ==================== */}
          {/* SUPER ADMIN           */}
          {/* ==================== */}

          <Route
            element={
              <RutaPorRol rolesPermitidos={["super-admin"]} />
            }
          >
            <Route element={<SuperAdminLayout />}>
              <Route path="/plataforma" element={<></>} />
              <Route path="/organizaciones" element={<></>} />
              <Route path="/planes" element={<></>} />
              <Route path="/auditoria" element={<></>} />
            </Route>
          </Route>


          {/* ==================== */}
          {/* ADMIN + SUPER ADMIN  */}
          {/* ==================== */}

          <Route
            element={
              <RutaPorRol
                rolesPermitidos={["super-admin", "admin"]}
              />
            }
          >
            <Route element={<LayoutSegunRol />}>

              <Route path="/panel" element={<></>} />
              <Route path="/allprestamos" element={<TodosLosPrestamos />} />
              <Route path="/gestion-catalogo" element={<GestionCatalogo/>} />

              {/* USUARIOS */}
              <Route
                path="/usuarios"
                element={<Usuario />}
              />

              <Route path="/reportes" element={<></>} />
              <Route path="/configuracion" element={<></>} />
            </Route>
          </Route>

          {/* Rutas de usuario normal (lector) */}
          <Route element={<RutaPorRol rolesPermitidos={["lector"]} />}>
            <Route element={<UsuarioLayout/>}>
              <Route path="/prestamos" element={<MisPrestamos />} />
              <Route path="/prestamo-exitoso" element={<PrestamoExitoso />} />
              <Route path="/prestamos/nuevo" element={<></>} />{/* Esta ruta es para un usuario cree un nuevo préstamo */}
              <Route path="/reportar" element={<></>} /> {/* Esta ruta es para que un usuario vea reporte un problema */}
            </Route>
          </Route>

        </Route>


        {/* ==================== */}
        {/* 404                   */}
        {/* ==================== */}

        <Route
          path="*"
          element={<h1>404 Not Found</h1>}
        />

      </Routes>
    </div>
  );
}
