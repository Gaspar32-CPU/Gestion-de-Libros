import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { puedeRetirarManana } from '../utils/horarios'

const MESES = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
]

// Horario que se muestra si la organización todavía no configuró el suyo
// (configuraciones.horarios = NULL). 0 = domingo, 6 = sábado.
const HORARIO_POR_DEFECTO = {
  0: null,
  1: { apertura: '08:00', cierre: '18:00' },
  2: { apertura: '08:00', cierre: '18:00' },
  3: { apertura: '08:00', cierre: '18:00' },
  4: { apertura: '08:00', cierre: '18:00' },
  5: { apertura: '08:00', cierre: '18:00' },
  6: null,
}

function horariosPorDia(horarios) {
  if (!Array.isArray(horarios)) return HORARIO_POR_DEFECTO
  return Object.fromEntries(
    horarios.map((h) => [
      h.dia,
      h.abierto ? { apertura: h.apertura, cierre: h.cierre } : null,
    ]),
  )
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return null
  const fecha = new Date(fechaStr)
  return `${fecha.getDate()} ${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`
}

export default function PrestamoExitoso() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const libro = state?.libro
  const prestamo = state?.prestamo

  // Si alguien llega directo a esta URL (sin pasar por la solicitud de
  // préstamo) no hay datos del libro que mostrar: lo mandamos al catálogo.
  if (!libro || !prestamo) {
    return <Navigate to="/catalogo" replace />
  }

  const lugarRetiro = prestamo.lugar_retiro ?? 'A confirmar'
  const lugarDevolucion = prestamo.lugar_devolucion ?? lugarRetiro
  const fechaDevolucion = formatearFecha(prestamo.fecha_devolucion_esperada)
  const horarioDevolucion = prestamo.horario_devolucion
  const cantidadExtensiones = prestamo.permite_extension
    ? prestamo.max_extensiones
    : 0
  const extensible = cantidadExtensiones > 0

  const horarioInstitucion = horariosPorDia(prestamo.horarios)
  const feriados = []

  const resultado = puedeRetirarManana(horarioInstitucion, feriados)

  const mensaje = resultado.disponibleManana
    ? `Podés retirar tu préstamo mañana, ${resultado.dia} (${resultado.fecha}), en el horario de ${resultado.horario}.`
    : resultado.proximoDisponible
      ? `Mañana la institución no atiende. Tu próximo día disponible para retirar es el ${resultado.proximoDisponible.diaSemana} ${resultado.proximoDisponible.fecha}, de ${resultado.proximoDisponible.apertura} a ${resultado.proximoDisponible.cierre}.`
      : 'Consultá con tu institución cuándo podés retirarlo.'

  return (
    <div className="flex flex-col items-center w-[calc(100%-2rem)] sm:w-3/5 p-6 sm:p-10 bg-white rounded-lg shadow-md mx-auto my-6 sm:my-10">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-4">
        <svg
          className="w-12 h-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-green-600 mb-4">
        ¡Préstamo confirmado!
      </h2>
      <p className="text-sm text-gray-700 text-center">
        Has adquirido el libro{' '}
        <span className="font-semibold text-gray-900">{libro.titulo}</span>.
        Aprobación automática, sin esperas.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-7 w-full text-left">
        <div className="bg-bg rounded-[13px] p-4">
          <div className="text-[11.5px] font-bold text-ink-3 uppercase tracking-[0.04em]">
            Retiro en
          </div>
          <div className="text-base font-extrabold mt-1.5">{lugarRetiro}</div>
          <div className="text-[12.5px] text-ink-2 font-semibold mt-0.5">
            {mensaje}
          </div>
        </div>

        <div className="bg-bg rounded-[13px] p-4">
          <div className="text-[11.5px] font-bold text-ink-3 uppercase tracking-[0.04em]">
            Devolver antes del
          </div>
          <div className="text-base font-extrabold mt-1.5">
            {fechaDevolucion}
          </div>
          <div className="text-[12.5px] text-ink-2 font-semibold mt-0.5">
            {horarioDevolucion && `Hasta las ${horarioDevolucion.cierre} · `}
            {lugarDevolucion}
          </div>
          <div className="text-[12.5px] text-ink-2 font-semibold mt-0.5">
            {prestamo.dias_prestamo} días
            {extensible &&
              ` · Lo podés extender ${cantidadExtensiones} ${cantidadExtensiones === 1 ? 'vez' : 'veces'}`}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
        <button
          onClick={() => navigate('/prestamos')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand text-white text-[15px] font-extrabold cursor-pointer border-none shadow-[0_6px_18px_-8px_rgba(0,0,0,0.45)]"
        >
          Ver mis préstamos
        </button>

        <button
          onClick={() => navigate('/catalogo')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-ink text-[15px] font-bold cursor-pointer border border-line"
        >
          Seguir explorando
        </button>
      </div>
    </div>
  )
}
