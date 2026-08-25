import Sidebar from "../components/Sidebar";
import { Assignment, DashboardOutlined, HistoryOutlined, PeopleAlt, PersonOutlined, ReportProblem } from "@mui/icons-material";
import { useAuth } from "../context/useAuth";
import { Outlet } from "react-router-dom";
import { useOrganizacion } from "../hooks/useOrganizacion";

const OPCIONES = [
  { label: "Plataforma", icon: DashboardOutlined, path: "/plataforma" },
  { label: "Organizaciones", icon: PeopleAlt, path: "/organizaciones" },
  { label: "Usuarios", icon: PersonOutlined, path: "/usuarios" },
  { label: "Planes", icon: Assignment, path: "/planes" },
  { label: "Soporte", icon: ReportProblem, path: "/reportes" },
  { label: "Auditoría", icon: HistoryOutlined, path: "/auditoria" },
];

export default function SuperAdminLayout() {
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