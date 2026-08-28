import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function RutaPorRol({ rolesPermitidos }) {
  const { usuario } = useAuth();

  if (!rolesPermitidos.includes(usuario?.rol)) {
    return <Navigate to="/catalogo" replace />;
  }

  return <Outlet />;
}