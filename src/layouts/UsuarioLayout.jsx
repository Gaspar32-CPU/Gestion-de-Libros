import { Outlet } from "react-router-dom";
import { LibraryBooks, MenuBook, ReportProblem } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/useAuth";

const OPCIONES = [
  { label: "Catálogo", icon: LibraryBooks, path: "/catalogo" },
  { label: "Mis Préstamos", icon: MenuBook, path: "/prestamos" },
  { label: "Reportar problema", icon: ReportProblem, path: "/reportar" },
];



export default function UsuarioLayout() {
    const { usuario } = useAuth();
    return (
    <div className="flex">
        <Sidebar opciones={OPCIONES} usuario={usuario} />
        <main className="flex-1 min-w-0">
            <Outlet />
        </main>
    </div>
  );
}