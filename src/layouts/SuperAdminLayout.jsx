import Sidebar from "../components/Sidebar";
import { Assignment, DashboardOutlined, HistoryOutlined, PeopleAlt, PersonOutlined, ReportProblem } from "@mui/icons-material";
import { useAuth } from "../context/useAuth";
import { Outlet } from "react-router-dom";

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
  return (
    <div className="flex">
        <Sidebar opciones={OPCIONES} usuario={usuario} />
        <main className="flex-1 min-w-0">
            <Outlet />
        </main>
    </div>
  );
}