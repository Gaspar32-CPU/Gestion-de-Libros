import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { obtenerUsuarios, filtrarUsuarios } from "../usuariosService";
import UsuarioIndividual from "./UsuarioIndividual";

export function Usuarios() {
  // Término de búsqueda controlado desde la barra de búsqueda del header
  const { busqueda = "" } = useOutletContext() ?? {};

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerUsuarios()
      .then(setUsuarios)
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        setError("No se pudieron obtener los usuarios.");
      })
      .finally(() => setCargando(false));
  }, []);

  const usuariosFiltrados = useMemo(
    () => filtrarUsuarios(usuarios, busqueda),
    [usuarios, busqueda]
  );

  if (cargando) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Cargando usuarios...</p>
      </div>
    );
  }

  if (error && usuarios.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <div className="rounded-xl border border-red-200 bg-white p-5">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">

      {/* Encabezado */}
      <div className="mb-7 flex items-end justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-tight text-[#152943]">
            Usuarios
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {usuariosFiltrados.length} personas registradas
          </p>

        </div>

      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Cabecera */}
      <div className="mb-2 grid grid-cols-[2.5fr_2.5fr_1.5fr_1.5fr_50px] gap-4 px-6 py-3 text-xs font-bold tracking-wider text-gray-400">

        <span>NOMBRE</span>
        <span>CORREO</span>
        <span>ROL</span>
        <span>ESTADO</span>
        <span></span>

      </div>

      {/* Lista */}
      {usuariosFiltrados.length === 0 ? (

        <div className="rounded-2xl border border-[#EAEAEA] bg-white p-10 text-center">

          <p className="text-sm text-gray-500">
            No hay usuarios registrados.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {usuariosFiltrados.map((usuario) => (
            <UsuarioIndividual key={usuario.id} usuario={usuario} />
          ))}

        </div>

      )}

    </div>
  );
}
