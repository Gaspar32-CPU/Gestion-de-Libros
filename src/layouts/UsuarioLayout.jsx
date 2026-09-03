import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Inventory2, MenuBook, ReportProblem } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { useAuth } from "../context/useAuth";
import { useOrganizacion } from "../hooks/useOrganizacion";

const OPCIONES = [
  { label: "Catálogo", icon: MenuBook, path: "/catalogo" },
  { label: "Mis Préstamos", icon: Inventory2, path: "/prestamos" },
  { label: "Reportar problema", icon: ReportProblem, path: "/reportar" },
];

const PLACEHOLDERS_BUSQUEDA = {
    "/catalogo": "Buscar por título o autor...",
    "/prestamos": "Buscar por título del libro...",
};

export default function UsuarioLayout() {
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