import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { obtenerTodosUsuarios, filtrarUsuarios, obtenerMisUsuarios } from "../usuariosService";
import UsuarioIndividual from "./UsuarioIndividual";
import { useAuth } from "../../../context/useAuth";

const FILTROS = [
  { valor: 'TODOS', label: 'Todos' },
  { valor: 'ACTIVO', label: 'Activo' },
  { valor: 'INACTIVO', label: 'Inactivo' },
];

export function Usuarios() {
  const { busqueda = "" } = useOutletContext() ?? {};
    const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const { usuario } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const isSuperAdmin = usuario?.rol === "super-admin" && usuario?.organizacionId === null;

  useEffect(() => {
    isSuperAdmin
      ? obtenerTodosUsuarios()
          .then((usuarios) => {
            setUsuarios(usuarios);
            setCargando(false);
          })
          .catch((error) => {
            setError(error.message || "Error al obtener los usuarios");
            setCargando(false);
          })
      : obtenerMisUsuarios()
          .then((usuarios) => {
            setUsuarios(usuarios);
            setCargando(false);
          })
          .catch((error) => {
            setError(error.message || "Error al obtener los usuarios");
            setCargando(false);
          });
  }, [isSuperAdmin]);

  const conteos = FILTROS.reduce((acc, { valor }) => {
    acc[valor] = valor === 'TODOS' ? usuarios.length : usuarios.filter((p) => p.activo === valor).length;
    return acc;
  }, {});

  const usuariosFiltrados = useMemo(() => {
    // filtro por estado
    const porEstado =
      filtroEstado === 'TODOS'
        ? usuarios
        : usuarios.filter((u) => u.activo === filtroEstado);

    // filtro por búsqueda sobre el resultado anterior
    return filtrarUsuarios(porEstado, busqueda);
  }, [usuarios, busqueda, filtroEstado]);


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

      <div className="mb-7 mx-auto items-end justify-between">

        <div className="pb-5">

          <h1 className="text-3xl font-bold tracking-tight text-[#152943]">
            Usuarios
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {usuariosFiltrados.length} personas registradas
          </p>

        </div>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {FILTROS.map(({ valor, label }) => (
            <button
              key={valor}
              type="button"
              onClick={() => setFiltroEstado(valor)}
              className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors ${
                filtroEstado === valor
                  ? 'bg-[#1fa48a] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {label} {conteos[valor]}
            </button>
          ))}
        </div>

      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      <div className="mb-2 grid grid-cols-[2.5fr_2.5fr_1.5fr_1.5fr_50px] gap-4 px-6 py-3 text-xs font-bold tracking-wider text-gray-400">

        <span>NOMBRE</span>
        <span>CORREO</span>
        <span>ROL</span>
        <span>ESTADO</span>
        <span></span>

      </div>

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
