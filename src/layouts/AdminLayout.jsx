import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { DashboardOutlined, Equalizer, Inventory2, MenuBook, PersonOutlined, Settings } from "@mui/icons-material";
import { useAuth } from "../context/useAuth";
import { Outlet, useLocation } from "react-router-dom";
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

const PLACEHOLDERS_BUSQUEDA = {
  "/catalogo": "Buscar por título o autor...",
  "/gestion-catalogo": "Buscar por título o autor...",
  "/allprestamos": "Buscar por título del libro...",
  "/usuarios": "Buscar por nombre o email...",
};

export default function AdminLayout() {
  const { usuario } = useAuth();
  const organizacion = useOrganizacion(usuario?.organizacionId);
  const [busqueda, setBusqueda] = useState("");
  const location = useLocation();
  const placeholderBusqueda = PLACEHOLDERS_BUSQUEDA[location.pathname];

  return (
    <div className="flex">
        <Sidebar opciones={OPCIONES} usuario={usuario} organizacion={organizacion} />
        <main className="flex-1 min-w-0">
            <DashboardHeader onBuscar={setBusqueda} mostrarBusqueda={!!placeholderBusqueda} placeholder={placeholderBusqueda} />
            <Outlet context={{ busqueda }} />
        </main>
    </div>
  );
}