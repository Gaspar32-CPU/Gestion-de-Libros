import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { puedeRetirarManana } from "../utils/horarios";

export default function PrestamoExitoso() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const libro = state?.libro;

  // Si alguien llega directo a esta URL (sin pasar por la solicitud de
  // préstamo) no hay datos del libro que mostrar: lo mandamos al catálogo.
  if (!libro) {
    return <Navigate to="/catalogo" replace />;
  }

  const lugarRetiro = "Sala de tutores";
  const fechaDevolucion = "12 ago 2026";
  const cantidadExtensiones = 2;
  const extensible = cantidadExtensiones > 1;

  // Horario de la institución, por día de la semana (0 = domingo, 6 = sábado)
  const horarioInstitucion = {
    0: null, // domingo cerrado
    1: { apertura: "08:00", cierre: "18:00" }, // lunes
    2: { apertura: "08:00", cierre: "18:00" },
    3: { apertura: "08:00", cierre: "18:00" },
    4: { apertura: "08:00", cierre: "18:00" },
    5: { apertura: "08:00", cierre: "18:00" },
    6: { apertura: "09:00", cierre: "13:00" }, // sábado medio día
  };

  // Excepciones puntuales (feriados, cierres especiales) como strings "YYYY-MM-DD"
  const feriados = ["2026-09-18", "2026-12-25"];

const resultado = puedeRetirarManana(horarioInstitucion, feriados);

const mensaje = resultado.disponibleManana
  ? `Podés retirar tu préstamo mañana, ${resultado.dia} (${resultado.fecha}), en el horario de ${resultado.horario}.`
  : `Mañana la institución no atiende. Tu próximo día disponible para retirar es el ${resultado.proximoDisponible.diaSemana} ${resultado.proximoDisponible.fecha}, de ${resultado.proximoDisponible.apertura} a ${resultado.proximoDisponible.cierre}.`;

  return (
    <div className="flex flex-col items-center w-3/5 h-3/5 p-10 bg-white rounded-lg shadow-md mx-auto my-10">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-4">¡Préstamo confirmado!</h2>
        <p className="text-sm text-gray-700 text-center">
          Has adquirido el libro <span className="font-semibold text-gray-900">{libro.titulo}</span>. Aprobación automática, sin esperas.
        </p>
        <div className="grid grid-cols-2 gap-3.5 my-7 text-left">
          <div className="bg-bg rounded-[13px] p-4">
            <div className="text-[11.5px] font-bold text-ink-3 uppercase tracking-[0.04em]">Retiro en</div>
            <div className="text-base font-extrabold mt-1.5">{lugarRetiro}</div>
            <div className="text-[12.5px] text-ink-2 font-semibold mt-0.5">{mensaje}</div>
          </div>

          <div className="bg-bg rounded-[13px] p-4">
            <div className="text-[11.5px] font-bold text-ink-3 uppercase tracking-[0.04em]">Devolver antes del</div>
            <div className="text-base font-extrabold mt-1.5">{fechaDevolucion}</div>
            <div className="text-[12.5px] text-ink-2 font-semibold mt-0.5">30 días · {extensible && `Lo puedes extender ${cantidadExtensiones} veces`}</div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/prestamos')}
            className="px-6 py-3.5 rounded-xl bg-brand text-white text-[15px] font-extrabold cursor-pointer border-none shadow-[0_6px_18px_-8px_rgba(0,0,0,0.45)]"
          >
            Ver mis préstamos
          </button>

          <button
            onClick={() => navigate('/catalogo')}
            className="px-6 py-3.5 rounded-xl bg-white text-ink text-[15px] font-bold cursor-pointer border border-line"
          >
            Seguir explorando
          </button>
        </div>
    </div>
  );
}
