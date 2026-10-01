import { useAuth } from "../context/useAuth";
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import UsuarioLayout from "../layouts/UsuarioLayout";

export function LayoutSegunRol() {
  const { usuario } = useAuth();
  if (usuario?.rol === "lector") return <UsuarioLayout />;
  if (usuario?.rol === "super-admin") return <SuperAdminLayout />;
  return <AdminLayout />;
}
