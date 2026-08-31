import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function RutaPorRol({ rolesPermitidos, redirectTo = "/catalogo" }) {
  const { usuario } = useAuth();

  if (!rolesPermitidos.includes(usuario?.rol)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}