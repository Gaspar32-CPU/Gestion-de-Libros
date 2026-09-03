import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Library,
  Users,
  BarChart3,
  Settings,
  Pencil
} from "lucide-react";
import api from "../../../services/api";

export function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: ""
  });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      setError("");

      const respuesta = await api.get("/usuarios");

      setUsuarios(respuesta.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setError("No se pudieron obtener los usuarios.");
    } finally {
      setCargando(false);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setNuevoUsuario({
      ...nuevoUsuario,
      [name]: value
    });
  };

  const agregarUsuario = async (e) => {
    e.preventDefault();

    if (nuevoUsuario.contrasena !== nuevoUsuario.confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setError("");

      await api.post("/auth/register", nuevoUsuario);

      await obtenerUsuarios();

      setNuevoUsuario({
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
        telefono: "",
        contrasena: "",
        confirmarContrasena: ""
      });

      setModalAbierto(false);

    } catch (error) {
      console.error("Error al agregar usuario:", error);

      if (error.response?.data?.mensaje) {
        setError(error.response.data.mensaje);
      } else {
        setError("No se pudo agregar el usuario.");
      }
    }
  };

  const obtenerIniciales = (nombre, apellido) => {
    const primera = nombre?.charAt(0) || "";
    const segunda = apellido?.charAt(0) || "";

    return `${primera}${segunda}`.toUpperCase() || "U";
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#F9F8F4] flex items-center justify-center">
        <p className="text-[#6B7280]">Cargando usuarios...</p>
      </div>
    );
  }

  if (error && usuarios.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F8F4] p-8">
        <div className="rounded-xl border border-red-200 bg-white p-5">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F4]">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col bg-[#152943] px-5 py-6">

        {/* Logo */}
        <div className="mb-10 flex items-center gap-3 px-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00A78E]">
            <span className="text-lg">🍃</span>
          </div>

          <div>
            <p className="font-semibold leading-tight text-white">
              Ánima
            </p>

            <p className="text-xs text-gray-400">
              Biblioteca
            </p>
          </div>

        </div>

        {/* Navegación */}
        <nav className="space-y-2">

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#1D3958] hover:text-white"
          >
            <LayoutDashboard size={18} />
            Panel
          </a>

          <a
            href="#"
            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#1D3958] hover:text-white"
          >
            <span className="flex items-center gap-3">
              <ArrowLeftRight size={18} />
              Préstamos
            </span>

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00A78E] text-[10px] font-semibold text-white">
              2
            </span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#1D3958] hover:text-white"
          >
            <Library size={18} />
            Catálogo
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#1D3958] hover:text-white"
          >
            <Library size={18} />
            Gestión catálogo
          </a>

          {/* Usuarios activo */}
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl bg-[#1D3958] px-4 py-3 text-sm font-medium text-white"
          >
            <Users
              size={18}
              className="text-[#00A78E]"
            />
            Usuarios
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#1D3958] hover:text-white"
          >
            <BarChart3 size={18} />
            Reportes
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-[#1D3958] hover:text-white"
          >
            <Settings size={18} />
            Configuración
          </a>

        </nav>

        {/* Perfil */}
        <div className="mt-auto rounded-xl bg-[#1B3552] p-3">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#80A836] text-sm font-semibold text-white">
              SM
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-medium text-white">
                Sofia Méndez
              </p>

              <p className="text-xs text-gray-400">
                Administrador
              </p>

            </div>

            <button
              type="button"
              className="text-gray-400 hover:text-white"
            >
              <Settings size={16} />
            </button>

          </div>

        </div>

      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="ml-[260px] min-h-screen px-8 py-7">

        {/* Selector de rol */}
        <div className="mb-10 flex justify-end">

          <div className="flex rounded-full border border-[#EAEAEA] bg-white p-1 shadow-sm">

            <button
              type="button"
              className="rounded-full px-4 py-1.5 text-sm text-gray-500"
            >
              Usuario
            </button>

            <button
              type="button"
              className="rounded-full bg-[#00A78E] px-4 py-1.5 text-sm font-medium text-white"
            >
              Admin
            </button>

            <button
              type="button"
              className="rounded-full px-4 py-1.5 text-sm text-gray-500"
            >
              Super
            </button>

          </div>

        </div>

        {/* Encabezado */}
        <div className="mb-7 flex items-end justify-between">

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-[#152943]">
              Usuarios
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {usuarios.length} personas registradas
            </p>

          </div>

          <button
            type="button"
            onClick={() => {
              setError("");
              setModalAbierto(true);
            }}
            className="rounded-xl bg-[#00A78E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008F7A]"
          >
            + Nuevo usuario
          </button>

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
        {usuarios.length === 0 ? (

          <div className="rounded-2xl border border-[#EAEAEA] bg-white p-10 text-center">

            <p className="text-sm text-gray-500">
              No hay usuarios registrados.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {usuarios.map((usuario) => (

              <div
                key={usuario.id}
                className="grid grid-cols-[2.5fr_2.5fr_1.5fr_1.5fr_50px] items-center gap-4 rounded-2xl border border-[#EAEAEA] bg-white px-6 py-4 shadow-sm transition hover:shadow-md"
              >

                {/* Nombre */}
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DDEBD7] text-sm font-semibold text-[#47734A]">
                    {obtenerIniciales(
                      usuario.nombre,
                      usuario.apellido
                    )}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-[#152943]">
                      {usuario.nombre || "Sin nombre"}{" "}
                      {usuario.apellido || ""}
                    </p>

                    <p className="text-xs text-gray-400">
                      C.I.: {usuario.cedula || "Sin cédula"}
                    </p>

                  </div>

                </div>

                {/* Correo */}
                <div className="truncate text-sm text-gray-500">
                  {usuario.correo || usuario.email || "Sin correo"}
                </div>

                {/* Rol */}
                <div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      usuario.rol?.toLowerCase() === "administrador"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {usuario.rol || "Usuario"}
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
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
                  >
                    <Pencil size={14} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      {/* MODAL NUEVO USUARIO */}
      {modalAbierto && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

            {/* Título */}
            <div className="mb-6">

              <h2 className="text-xl font-bold text-[#152943]">
                Nuevo usuario
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Completa los datos del nuevo usuario.
              </p>

            </div>

            {/* Formulario */}
            <form
              onSubmit={agregarUsuario}
              className="space-y-4"
            >

              {/* Nombre y apellido */}
              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nombre
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={nuevoUsuario.nombre}
                    onChange={manejarCambio}
                    required
                    placeholder="Ej: Ana"
                    className="w-full rounded-xl border border-[#EAEAEA] px-4 py-2.5 outline-none transition focus:border-[#00A78E]"
                  />

                </div>

                <div>

                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Apellido
                  </label>

                  <input
                    type="text"
                    name="apellido"
                    value={nuevoUsuario.apellido}
                    onChange={manejarCambio}
                    required
                    placeholder="Ej: Rodríguez"
                    className="w-full rounded-xl border border-[#EAEAEA] px-4 py-2.5 outline-none transition focus:border-[#00A78E]"
                  />

                </div>

              </div>

              {/* Cédula */}
              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Cédula
                </label>

                <input
                  type="text"
                  name="cedula"
                  value={nuevoUsuario.cedula}
                  onChange={manejarCambio}
                  required
                  placeholder="Ej: 51234567"
                  className="w-full rounded-xl border border-[#EAEAEA] px-4 py-2.5 outline-none transition focus:border-[#00A78E]"
                />

              </div>

              {/* Correo */}
              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  name="correo"
                  value={nuevoUsuario.correo}
                  onChange={manejarCambio}
                  required
                  placeholder="Ej: ana.rodriguez@email.com"
                  className="w-full rounded-xl border border-[#EAEAEA] px-4 py-2.5 outline-none transition focus:border-[#00A78E]"
                />

              </div>

              {/* Teléfono */}
              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Teléfono
                </label>

                <input
                  type="tel"
                  name="telefono"
                  value={nuevoUsuario.telefono}
                  onChange={manejarCambio}
                  required
                  placeholder="Ej: 099123456"
                  className="w-full rounded-xl border border-[#EAEAEA] px-4 py-2.5 outline-none transition focus:border-[#00A78E]"
                />

              </div>

              {/* Contraseña */}
              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Contraseña
                </label>

                <input
                  type="password"
                  name="contrasena"
                  value={nuevoUsuario.contrasena}
                  onChange={manejarCambio}
                  required
                  placeholder="Ingresa una contraseña"
                  className="w-full rounded-xl border border-[#EAEAEA] px-4 py-2.5 outline-none transition focus:border-[#00A78E]"
                />

              </div>

              {/* Confirmar contraseña */}
              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </label>

                <input
                  type="password"
                  name="confirmarContrasena"
                  value={nuevoUsuario.confirmarContrasena}
                  onChange={manejarCambio}
                  required
                  placeholder="Repite la contraseña"
                  className="w-full rounded-xl border border-[#EAEAEA] px-4 py-2.5 outline-none transition focus:border-[#00A78E]"
                />

              </div>

              {/* Botones */}
              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => {
                    setModalAbierto(false);
                    setError("");
                  }}
                  className="rounded-xl border border-[#EAEAEA] px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#00A78E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#008F7A]"
                >
                  Guardar usuario
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}