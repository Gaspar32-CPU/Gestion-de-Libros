import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { obtenerIniciales } from "../../../utils/obtenerIniciales";

const ROLES_ADMIN = ["admin", "super-admin"];

export default function UsuarioIndividual({ usuario }) {
    return (
        <div
            className="grid grid-cols-[2.5fr_2.5fr_1.5fr_1.5fr_50px] items-center gap-4 rounded-2xl border border-[#EAEAEA] bg-white px-6 py-4 shadow-sm transition hover:shadow-md"
        >

            {/* Nombre */}
            <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DDEBD7] text-sm font-semibold text-[#47734A]">
                {obtenerIniciales(usuario.nombreCompleto) || "Usuario"}
            </div>

            <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-[#152943]">
                {usuario.nombreCompleto || "Sin nombre"}
                </p>

                <p className="text-xs text-gray-400">
                C.I.: {usuario.cedula || "Sin cédula"}
                </p>

            </div>

            </div>

            {/* Correo */}
            <div className="truncate text-sm text-gray-500">
            {usuario.correo || "Sin correo"}
            </div>

            {/* Rol */}
            <div>

            <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                ROLES_ADMIN.includes(usuario.rol)
                    ? "bg-blue-50 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
            >
                {usuario.rolEtiqueta || "Usuario"}
            </span>

            </div>

            {/* Estado */}
            <div>

            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                usuario.estado?.toLowerCase() === "congelado"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-green-50 text-green-700"
                }`}
            >
                {usuario.estado || "Activo"}
            </span>

            </div>

            {/* Editar */}
            <div className="flex justify-end">

            <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
            >
                <EditOutlinedIcon sx={{ fontSize: 14 }} />
            </button>

            </div>

        </div>

    );
}