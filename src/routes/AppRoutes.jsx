import { Routes, Route, Link } from "react-router-dom";

// Layouts
import AdminLayout from "../layouts/AdminLayout";

// Pages (features)
import Login from "../features/auth/pages/login";
import { RutaProtegida } from "../components/RutaProtegida";

function AppRoutes() {
  return (
    <>
      <nav>
        <Link to="/">Landing</Link>
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/productos">Catálogo</Link>
      </nav>

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<>Landing</>}> //queda para importar MarketingLayout
          <Route index element={<></>} /> //queda para importar LandingPage
          <Route path="precios" element={<></>} /> //queda para importar PreciosPage
          <Route path="contacto" element={<></>} /> //queda para importar ContactoPage
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/catalogo" element={<></>} /> // Esta ruta es para el catalogo de productos
        <Route path="/catalogo/:id" element={<></>} />// Esta ruta es para un libro en particular
        <Route path="*" element={<h1>404 Not Found</h1>} />

        {/* Rutas protegidas */}
        <Route element={<RutaProtegida />}>
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