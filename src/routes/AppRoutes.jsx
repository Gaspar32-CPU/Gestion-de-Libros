import { Routes, Route, Link } from "react-router-dom";

// Layouts
import AdminLayout from "../layouts/AdminLayout";

// Pages (features)
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";


function AppRoutes() {
  return (
    <>
      <nav>
        <Link to="/">Landing | </Link>
        <Link to="/login">Iniciar sesión | </Link>
        <Link to="/register">Registrarse | </Link>
        <Link to="/productos">Catálogo </Link>
      </nav>

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} /> // Esta ruta es para el catalogo de productos
        <Route path="/productos/:id" element={<></>} />

        <Route path="/admin" element={<AdminLayout />}> //Esta ruta es para el panel de administración, el contenido actual es solo un ejemplo
          <Route path="usuarios" element={<></>} /> // Esta ruta es para los usuarios normales 
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />

        {/* Rutas protegidas */}
        <Route element={<></>}> // RutaProtegida
          {/* Rutas solo de admin */}
          <Route element={<></>}>// "Rutas solo admin" es un layout que contiene un sidebar con links a las rutas de admin
            <Route path="/usuarios" element={<></>} />// Esta ruta es para un admin vea todos los usuarios
            <Route path="/libros" element={<></>} /> // Esta ruta es para un admin vea todos los libros
            <Route path="/libros/:id" element={<></>} /> // Esta ruta es para un admin vea un libro en particular
            <Route path="/libros/:id/editar" element={<></>} /> // Esta ruta es para un admin edite un libro en particular
            <Route path="/libros/nuevo" element={<></>} />// Esta ruta es para un admin cree un nuevo libro
            <Route path="/prestamos" element={<></>} />// Esta ruta es para un admin vea todos los préstamos
          </Route>
          {/* Rutas de usuario normal */}
          <Route path="/perfil" element={<>Perfil</>} />
          <Route path="/prestamos/nuevo" element={<></>} />// Esta ruta es para un usuario cree un nuevo préstamo

          <Route path="/dashboard" element={<>Dashboard</>} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;