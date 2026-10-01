import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function RutaPorRol({ rolesPermitidos, redirectTo = "/catalogo" }) {
  const { usuario } = useAuth();
  // Un <Outlet> sin context propio no hereda el del padre: si no lo
  // reenviamos acá, cualquier ruta anidada debajo de RutaPorRol pierde el
  // outlet context (por ej. la busqueda del header en /catalogo).
  const context = useOutletContext();

  if (!rolesPermitidos.includes(usuario?.rol)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet context={context} />;
}