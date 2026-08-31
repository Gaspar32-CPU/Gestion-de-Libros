// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Páginas
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import LandingPage from "../features/landing/pages/LandingPage";
import { LibroDetalle } from "../features/libro/LibroDetalle";
import Catalogo from "../features/catalogo/pages/Catalogo";
import { Usuario } from "../features/usuarios/pages/Usuario";

// Componentes
import { RutaProtegida } from "../components/RutaProtegida";
import { RutaPublica } from "../components/RutaPublica";
import { RutaPorRol } from "../components/RutaPorRol";

// Layouts
import UsuarioLayout from "../layouts/UsuarioLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import { LayoutSegunRol } from "./LayoutSegunRol";

function AppRoutes() {
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

        <Route path="/libro" element={<LibroDetalle />} />


        {/* ==================== */}
        {/* RUTAS PROTEGIDAS     */}
        {/* ==================== */}

        <Route element={<RutaProtegida />}>

          {/* Rutas compartidas */}
          <Route element={<LayoutSegunRol />}>
            <Route path="/catalogo" element={<Catalogo />} />
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

              <Route
                path="/gestion-catalogo"
                element={<></>}
              />

              <Route
                path="/allprestamos"
                element={<></>}
              />

              {/* USUARIOS */}
              <Route
                path="/usuarios"
                element={<Usuario />}
              />

              <Route
                path="/reportes"
                element={<></>}
              />

              <Route
                path="/configuracion"
                element={<></>}
              />

            </Route>
          </Route>


          {/* ==================== */}
          {/* USUARIO / LECTOR     */}
          {/* ==================== */}

          <Route
            element={
              <RutaPorRol rolesPermitidos={["lector"]} />
            }
          >
            <Route element={<UsuarioLayout />}>

              <Route
                path="/prestamos"
                element={<></>}
              />

              <Route
                path="/prestamos/nuevo"
                element={<></>}
              />

              <Route
                path="/reportar"
                element={<></>}
              />

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

export default AppRoutes;
