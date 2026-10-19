import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuth';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const FILTROS = [
  { valor: 'TODOS', label: 'Todos' },
  { valor: 'ACTIVO', label: 'Activo' },
  { valor: 'PENDIENTE_RETIRO', label: 'Pendiente de retiro' },
  { valor: 'ATRASADO', label: 'Atrasado' },
  { valor: 'DEVUELTO', label: 'Devuelto' },
  { valor: 'CANCELADO', label: 'Cancelado' },

];

function formatearFecha(fechaStr) {
  if (!fechaStr) return null;
  const [anio, mes, dia] = fechaStr.slice(0, 10).split('-');
  return `${Number(dia)} ${MESES[Number(mes) - 1]} ${anio}`;
}

function obtenerEstiloEstado(estado) {
  switch (estado) {
    case 'ACTIVO': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'ATRASADO': return 'bg-rose-50 text-rose-700 border-rose-200';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

const ETIQUETAS_ESTADO = {
  ACTIVO: 'Activo',
  CANCELADO: 'Cancelado',
  DEVUELTO: 'Devuelto',
  ATRASADO: 'Atrasado',
  PENDIENTE_RETIRO: 'Pendiente de retiro',
};

function normalizarEstado(estado) {
  return ETIQUETAS_ESTADO[estado] ?? estado;
}

// Tabla + filtros de préstamos, reutilizada por la vista del lector (sus
// propios préstamos) y la del admin (todos los de su organización). Lo que
// cambia entre una y otra es de dónde vienen los datos y qué acciones se
// habilitan, no la forma de mostrarlos.
export default function PrestamosPanel({ titulo, subtitulo, cargarPrestamos, mostrarExtender = false, onMarcarRetirado, onMarcarDevuelto, onExtender }) {
  const [prestamos, setPrestamos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [idAccionEnCurso, setIdAccionEnCurso] = useState(null);
  const { usuario } = useAuth();

  useEffect(() => {
    cargarPrestamos()
      .then(setPrestamos)
      .catch((err) => {
        console.error('Error al traer los préstamos', err);
        setError('No pudimos traer los préstamos. Intentá de nuevo más tarde.');
      })
      .finally(() => setCargando(false));
  }, [cargarPrestamos]);

  const conteos = FILTROS.reduce((acc, { valor }) => {
    acc[valor] = valor === 'TODOS' ? prestamos.length : prestamos.filter((p) => p.estado === valor).length;
    return acc;
  }, {});

  const prestamosFiltrados = filtroEstado === 'TODOS'
    ? prestamos
    : prestamos.filter((p) => p.estado === filtroEstado);

  const handleMarcarDevuelto = async (id) => {
    setError('');
    setIdAccionEnCurso(id);
    try {
      const prestamoActualizado = await onMarcarDevuelto(id);
      setPrestamos((prev) => prev.map((p) => (p.id === id ? prestamoActualizado : p)));
    } catch (err) {
      console.error('Error al marcar el préstamo como devuelto', err);
      setError(err.response?.data?.mensaje || 'No se pudo marcar el préstamo como devuelto.');
    } finally {
      setIdAccionEnCurso(null);
    }
  };

  const handleMarcarRetiro = async (id) => {
    setError('');
    setIdAccionEnCurso(id);
    try {
      const prestamoActualizado = await onMarcarRetirado(id);
      setPrestamos((prev) => prev.map((p) => (p.id === id ? prestamoActualizado : p)));
    } catch (err) {
      console.error('Error al marcar el libro como retirado', err);
      setError(err.response?.data?.mensaje || 'No se pudo marcar el libro como retirado.');
    } finally {
      setIdAccionEnCurso(null);
    }
  };

  const handleExtender = async (id) => {
    setError('');
    setIdAccionEnCurso(id);
    try {
      const prestamoActualizado = await onExtender(id);
      setPrestamos((prev) => prev.map((p) => (p.id === id ? prestamoActualizado : p)));
    } catch (err) {
      console.error('Error al extender el préstamo', err);
      setError(err.response?.data?.mensaje || 'No se pudo extender el préstamo.');
    } finally {
      setIdAccionEnCurso(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 text-slate-800">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{titulo}</h1>
        <p className="text-sm text-[#1fa48a] font-medium mt-1">{subtitulo}</p>
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

      {error && (
        <p className="mb-4 text-sm text-rose-600">{error}</p>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 text-xs font-bold tracking-wider uppercase">
                <th className="p-4">Libro</th>
                <th className="p-4">Usuario</th>
                <th className="p-4">Retiro</th>
                <th className="p-4">Vencimiento</th>
                <th className="p-4">Estado</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cargando ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-sm text-slate-500">Cargando préstamos...</td>
                </tr>
              ) : prestamosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-sm text-slate-500">No hay préstamos en este estado.</td>
                </tr>
              ) : (
                prestamosFiltrados.map((item) => {
                  const devuelto = item.estado === 'DEVUELTO';
                  const atrasado = item.estado === 'ATRASADO';
                  const activo = item.estado === 'ACTIVO';
                  const pendienteRetiro = item.estado === 'PENDIENTE_RETIRO';
                  const sinExtensiones = item.extensionesRealizadas < item.maxExtensiones;
                  const admin = usuario?.rol === "admin";
                  const enCurso = idAccionEnCurso === item.id;
                  const marcarDevuelto = admin && (atrasado || activo);
                  const marcarRetiro = admin && (pendienteRetiro);
                  const cancelarPrestamo = pendienteRetiro;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-900">{item.libro.titulo}</td>
                      <td className="p-4 text-slate-600">{item.usuario}</td>
                      <td className="p-4 text-slate-600">{item.retiro}</td>
                      <td className="p-4 text-slate-600">{devuelto ? '—' : formatearFecha(item.fechaMaxima) ?? '—'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${obtenerEstiloEstado(item.estado)}`}>
                          {normalizarEstado(item.estado)}
                        </span>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        {devuelto ? (
                          <span className="text-xs text-slate-400">
                            ✓ {formatearFecha(item.fechaDevolucion) ?? '-'}
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            {mostrarExtender && sinExtensiones && !pendienteRetiro && (!atrasado && !admin) && activo && (
                              <button
                                type="button"
                                onClick={() => handleExtender(item.id)}
                                disabled={enCurso}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1fa48a] border border-[#1fa48a] hover:bg-[#1fa48a]/5 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                              >
                                Extender plazo
                              </button>
                            )}

                            {marcarRetiro && (
                                <button
                                  type="button"
                                  onClick={() => handleMarcarRetiro(item.id)}
                                  disabled={enCurso}
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2b6cb0] hover:bg-[#245a94] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                >
                                  {enCurso ? 'Guardando...' : 'Marcar retiro'}
                                </button>
                              )}
                            {marcarDevuelto && (
                              <button
                                type="button"
                                onClick={() => handleMarcarDevuelto(item.id)}
                                disabled={enCurso}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#1fa48a] hover:bg-[#198771] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                              >
                                {enCurso ? 'Guardando...' : 'Marcar devuelto'}
                              </button>
                            )}
                            {cancelarPrestamo && (
                              <button
                                type="button"
                                onClick={() => handleMarcarDevuelto(item.id)}
                                disabled={enCurso}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                              >
                                {enCurso ? 'Guardando...' : 'Cancelar préstamo'}
                              </button>
                            )}

                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
