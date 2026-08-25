import Sidebar from "../components/Sidebar";
import { DashboardOutlined, Equalizer, Inventory2, MenuBook, PersonOutlined, Settings } from "@mui/icons-material";
import { useAuth } from "../context/useAuth";
import { Outlet } from "react-router-dom";
import { useOrganizacion } from "../hooks/useOrganizacion";

const OPCIONES = [
  { label: "Panel", icon: DashboardOutlined, path: "/panel" },
  { label: "Catálogo", icon: MenuBook, path: "/catalogo" },
  { label: "Gestión catálogo", icon: MenuBook, path: "/gestion-catalogo" },
  { label: "Préstamos", icon: Inventory2, path: "/allprestamos" },
  { label: "Usuarios", icon: PersonOutlined, path: "/usuarios" },
  { label: "Reportes", icon: Equalizer, path: "/reportes" },
  { label: "Configuración", icon: Settings, path: "/configuracion" },
];

export default function AdminLayout() {
  const { usuario } = useAuth();
  const organizacion = useOrganizacion(usuario?.organizacionId);

  return (
    <div className="flex">
        <Sidebar opciones={OPCIONES} usuario={usuario} organizacion={organizacion} />
        <main className="flex-1 min-w-0">
            <Outlet />
        </main>
    </div>
  );
}