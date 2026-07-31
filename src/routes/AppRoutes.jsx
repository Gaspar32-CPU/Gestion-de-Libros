import { Routes, Route, Link } from "react-router-dom";

// Layouts
import UsuarioLayout from "../layouts/UsuarioLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages (features)
import Login from "../features/auth/pages/login";

function AppRoutes() {
  return (
    <>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/productos">Catálogo</Link>
      </nav>

      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<></>} /> // Esta ruta es para el catalogo de productos
        <Route path="/productos/:id" element={<LibroDetallePage />} />

        <Route path="/admin" element={<AdminLayout />}> //Esta ruta es para el panel de administración, el contenido actual es solo un ejemplo
          <Route path="usuarios" element={<></>} /> // Esta ruta es para los usuarios normales 
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default AppRoutes;