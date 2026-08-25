import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function RutaProtegida() {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  if (cargando) return <p>Cargando...</p>;

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}