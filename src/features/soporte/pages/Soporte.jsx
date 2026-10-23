import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Select from '../../../components/Select';
import { cambiarEstadoReporte } from '../soporteService';
import { obtenerSecciones } from '../../reportes/reportesService';
import { avisarCambioSoporte } from '../usePendientesSoporte';

// Estilos tomados del prototipo (Bookly.html → "SOPORTE").
const ESTADOS = {
  abierto: { label: 'Abierto', clase: 'bg-[#FBE7E6] text-[#C0453F]' },
  en_revision: { label: 'En curso', clase: 'bg-[#FDF0E2] text-[#B5701E]' },
  resuelto: { label: 'Resuelto', clase: 'bg-[#E6F6EC] text-[#1F8A54]' },
};

const FILTROS_ESTADO = [
  { id: 'abierto', label: 'Abiertos' },
  { id: 'en_revision', label: 'En curso' },
  { id: 'resuelto', label: 'Resueltos' },
  { id: 'todos', label: 'Todos los estados' },
];

const ROLES = {
  lector: 'Lector',
  admin: 'Administrador',
};

const BOTON_BLANCO =
  'cursor-pointer whitespace-nowrap rounded-[9px] border-[1.5px] border-[#E7E2D7] bg-white px-3.5 py-[9px] text-[12.5px] font-bold text-[#16324F] hover:bg-[#F6F4EE] disabled:cursor-not-allowed disabled:opacity-60';
const BOTON_VERDE =
  'cursor-pointer whitespace-nowrap rounded-[9px] bg-[#2FA36B] px-3.5 py-[9px] text-[12.5px] font-bold text-white hover:bg-[#268a5a] disabled:cursor-not-allowed disabled:opacity-60';

function tiempoRelativo(fecha) {
  const minutos = Math.floor((Date.now() - new Date(fecha).getTime()) / 60000);
  if (minutos < 1) return 'Justo ahora';
  if (minutos < 60) return `Hace ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `Hace ${horas} h`;
  const dias = Math.floor(horas / 24);
  if (dias === 1) return 'Ayer';
  return `Hace ${dias} días`;
}

export default function Soporte() {
  // Los reportes vienen del hook compartido con el badge del menú
  // (SuperAdminLayout), para no pedirlos dos veces al entrar a /soporte.
  const {
    reportesSoporte: reportes = [],
    soporteCargado = false,
    errorSoporte = false,
  } = useOutletContext() ?? {};

  const [secciones, setSecciones] = useState([]);
  const [cargandoSecciones, setCargandoSecciones] = useState(true);
  const [errorSecciones, setErrorSecciones] = useState('');

  const [filtroEstado, setFiltroEstado] = useState('abierto');
  const [filtroVista, setFiltroVista] = useState('todas');

  // Ids con una petición en curso (puede haber más de una fila a la vez).
  const [idsActualizando, setIdsActualizando] = useState(() => new Set());
  const [errorAccion, setErrorAccion] = useState('');

  // Reporte que se está por resolver: muestra el campo de comentario.
  const [resolviendoId, setResolviendoId] = useState(null);
  const [comentario, setComentario] = useState('');
  const [errorComentario, setErrorComentario] = useState('');

  useEffect(() => {
    obtenerSecciones()
      .then(setSecciones)
      .catch(() => setErrorSecciones('No pudimos cargar las secciones. Recargá la página para intentar de nuevo.'))
      .finally(() => setCargandoSecciones(false));
  }, []);

  function abrirResolucion(id) {
    setResolviendoId(id);
    setComentario('');
    setErrorComentario('');
  }

  function cerrarResolucion() {
    setResolviendoId(null);
    setComentario('');
    setErrorComentario('');
  }

  async function cambiarEstado(id, estado, comentarioResolucion) {
    setIdsActualizando((anteriores) => new Set(anteriores).add(id));
    setErrorAccion('');
    try {
      await cambiarEstadoReporte(id, estado, comentarioResolucion);
      if (resolviendoId === id) cerrarResolucion();
      avisarCambioSoporte();
    } catch (error) {
      setErrorAccion(error.response?.data?.mensaje ?? 'No pudimos actualizar el reporte. Probá de nuevo.');
      // Si otro super admin lo cambió mientras tanto, traemos la lista actualizada.
      if (error.response?.status === 409) {
        if (resolviendoId === id) cerrarResolucion();
        avisarCambioSoporte();
      }
    } finally {
      setIdsActualizando((anteriores) => {
        const siguientes = new Set(anteriores);
        siguientes.delete(id);
        return siguientes;
      });
    }
  }

  function confirmarResolucion(id) {
    if (!comentario.trim()) {
      setErrorComentario('Contanos qué se hizo para resolverlo');
      return;
    }
    cambiarEstado(id, 'resuelto', comentario.trim());
  }

  const porVista = reportes.filter(
    (r) => filtroVista === 'todas' || Number(r.id_seccion) === Number(filtroVista),
  );

  const contarEstado = (id) =>
    id === 'todos' ? porVista.length : porVista.filter((r) => r.estado === id).length;

  const visibles = porVista.filter((r) => filtroEstado === 'todos' || r.estado === filtroEstado);

  const cargando = !soporteCargado || cargandoSecciones;
  const errorCarga = errorSoporte
    ? 'No pudimos cargar los reportes. Recargá la página para intentar de nuevo.'
    : errorSecciones;

  return (
    <div className="max-w-[900px] p-9 text-[#16324F]">
      <h1 className="mb-1.5 text-[27px] font-extrabold tracking-[-0.02em]">Soporte</h1>
      <p className="mb-5 text-[14.5px] text-[#4A6076]">
        Los problemas que reportan los usuarios de cualquier organización llegan acá.
      </p>

      <div className="mb-[18px] flex flex-wrap items-center gap-3 rounded-2xl border border-[#E7E2D7] bg-white px-5 py-3.5">
        <span className="text-[13px] font-bold text-[#4A6076]">Filtrar:</span>

        <Select
          aria-label="Estado"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="font-semibold"
        >
          {FILTROS_ESTADO.map(({ id, label }) => (
            <option key={id} value={id}>
              {label} ({contarEstado(id)})
            </option>
          ))}
        </Select>

        <Select
          aria-label="Vista"
          value={filtroVista}
          onChange={(e) => setFiltroVista(e.target.value)}
          className="font-semibold"
        >
          <option value="todas">Todas las vistas</option>
          {secciones.map((seccion) => (
            <option key={seccion.id} value={seccion.id}>
              {seccion.nombre}
            </option>
          ))}
        </Select>
      </div>

      {errorAccion && <p className="mb-3 text-[13px] font-semibold text-[#D9534F]">{errorAccion}</p>}

      {cargando && <p className="text-sm text-[#4A6076]">Cargando reportes…</p>}
      {errorCarga && <p className="text-sm font-semibold text-[#D9534F]">{errorCarga}</p>}
      {!cargando && !errorCarga && visibles.length === 0 && (
        <p className="rounded-2xl border border-[#E7E2D7] bg-white p-5 text-sm text-[#4A6076]">
          {reportes.length === 0 ? 'Todavía nadie reportó un problema.' : 'No hay reportes con estos filtros.'}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {visibles.map((reporte) => {
          const estado = ESTADOS[reporte.estado] ?? ESTADOS.abierto;
          const ocupado = idsActualizando.has(reporte.id);
          const resolviendo = resolviendoId === reporte.id;

          return (
            <article key={reporte.id} className="rounded-2xl border border-[#E7E2D7] bg-white p-5">
              <div className="flex items-start gap-3.5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-[9px]">
                    <span className="text-xs font-extrabold tracking-[0.03em] text-[#8595A6]">Ticket - {reporte.id}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${estado.clase}`}>{estado.label}</span>
                  </div>
                  <h2 className="mt-2 text-base font-extrabold tracking-[-0.015em]">
                    {reporte.seccion ?? 'Sin sección'}
                  </h2>
                  <p className="mt-1.5 whitespace-pre-line break-words text-[13.5px] font-medium leading-normal text-[#4A6076]">
                    {reporte.descripcion}
                  </p>
                  <p className="mt-[9px] text-[12.5px] font-semibold text-[#8595A6]">
                    {reporte.usuario} · {ROLES[reporte.rol_usuario] ?? reporte.rol_usuario} · {reporte.organizacion} ·{' '}
                    {tiempoRelativo(reporte.fecha_reporte)}
                  </p>

                  {reporte.estado === 'en_revision' && reporte.tomado_por && (
                    <p className="mt-1 text-[12.5px] font-semibold text-[#B5701E]">
                      Tomado por {reporte.tomado_por} · {tiempoRelativo(reporte.fecha_tomado)}
                    </p>
                  )}
                </div>

                <div className="flex flex-none flex-col gap-2">
                  {/* Un reporte abierto primero se toma; recién en curso se puede resolver. */}
                  {reporte.estado === 'abierto' && (
                    <button
                      type="button"
                      disabled={ocupado}
                      onClick={() => cambiarEstado(reporte.id, 'en_revision')}
                      className={BOTON_BLANCO}
                    >
                      {ocupado ? 'Tomando…' : 'Tomar'}
                    </button>
                  )}
                  {reporte.estado === 'en_revision' && !resolviendo && (
                    <button type="button" onClick={() => abrirResolucion(reporte.id)} className={BOTON_VERDE}>
                      Resolver
                    </button>
                  )}
                </div>
              </div>

              {/* Confirmación de resolución, con el comentario obligatorio. */}
              {reporte.estado === 'en_revision' && resolviendo && (
                <div className="mt-4 border-t border-[#E7E2D7] pt-4">
                  <label
                    htmlFor={`comentario-${reporte.id}`}
                    className="text-[13px] font-semibold text-[#4A6076]"
                  >
                    ¿Qué se hizo para resolverlo?
                  </label>
                  <textarea
                    id={`comentario-${reporte.id}`}
                    value={comentario}
                    onChange={(e) => {
                      setComentario(e.target.value);
                      setErrorComentario('');
                    }}
                    placeholder="Contá qué cambios aplicaste o cómo se solucionó…"
                    aria-invalid={Boolean(errorComentario)}
                    className={`mt-[7px] block min-h-[90px] w-full resize-y rounded-[10px] border-[1.5px] bg-white p-3 text-sm text-[#16324F] outline-none focus:border-[#12A594] ${
                      errorComentario ? 'border-[#D9534F]' : 'border-[#E7E2D7]'
                    }`}
                  />
                  {errorComentario && (
                    <p className="mt-1.5 text-[13px] font-semibold text-[#D9534F]">{errorComentario}</p>
                  )}
                  <div className="mt-3 flex justify-end gap-2">
                    <button type="button" disabled={ocupado} onClick={cerrarResolucion} className={BOTON_BLANCO}>
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={ocupado}
                      onClick={() => confirmarResolucion(reporte.id)}
                      className={BOTON_VERDE}
                    >
                      {ocupado ? 'Guardando…' : 'Marcar como resuelto'}
                    </button>
                  </div>
                </div>
              )}

              {/* Registro de la resolución: solo lo ve el super admin. */}
              {reporte.estado === 'resuelto' && reporte.resuelto_por && (
                <div className="mt-4 rounded-[10px] bg-[#F6F4EE] px-4 py-3">
                  <p className="text-[12.5px] font-bold text-[#1F8A54]">
                    Resuelto por {reporte.resuelto_por} · {tiempoRelativo(reporte.fecha_resuelto)}
                  </p>
                  {reporte.comentario_resolucion && (
                    <p className="mt-1 whitespace-pre-line break-words text-[13px] font-medium text-[#4A6076]">
                      {reporte.comentario_resolucion}
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
