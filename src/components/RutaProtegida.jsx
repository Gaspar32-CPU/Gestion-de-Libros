import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function RutaProtegida() {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p>Cargando...</p>;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}