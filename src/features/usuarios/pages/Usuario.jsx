import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { z } from "zod";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import api from "../../../services/api";
import { normalizarTexto } from "../../../utils/normalizarTexto";

const USUARIO_INICIAL = {
  nombre: "",
  apellido: "",
  cedula: "",
  correo: "",
  telefono: "",
  contrasena: "",
  confirmarContrasena: ""
};

const esquemaNuevoUsuario = z
  .object({
    nombre: z.string().trim().min(1, "El nombre es obligatorio."),
    apellido: z.string().trim().min(1, "El apellido es obligatorio."),
    cedula: z.string().trim().min(1, "La cédula es obligatoria."),
    correo: z.string().trim().min(1, "El correo es obligatorio.").email("Ingresá un correo electrónico válido."),
    telefono: z.string().trim().min(1, "El teléfono es obligatorio."),
    contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
    confirmarContrasena: z.string()
  })
  .refine((datos) => datos.contrasena === datos.confirmarContrasena, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarContrasena"]
  });

export function Usuario() {
  // Término de búsqueda controlado desde la barra de búsqueda del header
  const { busqueda = "" } = useOutletContext() ?? {};

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [errorModal, setErrorModal] = useState("");

  const [nuevoUsuario, setNuevoUsuario] = useState(USUARIO_INICIAL);

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

  useEffect(() => {
    api.get("/usuarios")
      .then((respuesta) => setUsuarios(respuesta.data))
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        setError("No se pudieron obtener los usuarios.");
      })
      .finally(() => setCargando(false));
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setNuevoUsuario({
      ...nuevoUsuario,
      [name]: value
    });
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setErrorModal("");
  };

  const limpiarContrasenas = () => {
    setNuevoUsuario((prev) => ({
      ...prev,
      contrasena: "",
      confirmarContrasena: ""
    }));
  };

  const agregarUsuario = async (e) => {
    e.preventDefault();

    const resultado = esquemaNuevoUsuario.safeParse(nuevoUsuario);

    if (!resultado.success) {
      setErrorModal(resultado.error.issues[0].message);
      limpiarContrasenas();
      return;
    }

    try {
      setErrorModal("");

      await api.post("/auth/register", resultado.data);

      await obtenerUsuarios();

      setNuevoUsuario(USUARIO_INICIAL);
      setModalAbierto(false);

    } catch (error) {
      console.error("Error al agregar usuario:", error);

      if (error.response?.data?.mensaje) {
        setErrorModal(error.response.data.mensaje);
      } else {
        setErrorModal("No se pudo agregar el usuario.");
      }

      limpiarContrasenas();
    }
  };

  const obtenerIniciales = (nombre, apellido) => {
    const primera = nombre?.charAt(0) || "";
    const segunda = apellido?.charAt(0) || "";

    return `${primera}${segunda}`.toUpperCase() || "U";
  };

  const usuariosFiltrados = useMemo(() => {
    const termino = normalizarTexto(busqueda);

    if (!termino) return usuarios;

    return usuarios.filter((usuario) => {
      const nombreCompleto = `${usuario.nombre || ""} ${usuario.apellido || ""}`;
      const correo = usuario.correo || usuario.email || "";

      return (
        normalizarTexto(nombreCompleto).includes(termino) ||
        normalizarTexto(correo).includes(termino)
      );
    });
  }, [usuarios, busqueda]);

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

        <button
          type="button"
          onClick={() => {
            setErrorModal("");
            setModalAbierto(true);
          }}
          className="cursor-pointer rounded-xl bg-[#00A78E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008F7A]"
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
      {usuariosFiltrados.length === 0 ? (

        <div className="rounded-2xl border border-[#EAEAEA] bg-white p-10 text-center">

          <p className="text-sm text-gray-500">
            No hay usuarios registrados.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {usuariosFiltrados.map((usuario) => (

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
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
                >
                  <EditOutlinedIcon sx={{ fontSize: 14 }} />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* MODAL NUEVO USUARIO */}
      {modalAbierto && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={cerrarModal}
        >

          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Título */}
            <div className="mb-6">

              <h2 className="text-xl font-bold text-[#152943]">
                Nuevo usuario
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Completa los datos del nuevo usuario.
              </p>

            </div>

            {/* Error del formulario */}
            {errorModal && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-600">
                  {errorModal}
                </p>
              </div>
            )}

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
                  onClick={cerrarModal}
                  className="cursor-pointer rounded-xl border border-[#EAEAEA] px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-[#00A78E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#008F7A]"
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
