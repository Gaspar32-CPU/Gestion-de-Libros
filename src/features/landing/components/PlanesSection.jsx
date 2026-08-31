import { useEffect, useState } from "react";
import { obtenerPlanes } from "../../../services/planes";
import { PricingCard } from "./PricingCard";
import { ContratacionModal } from "./ContratacionModal";

export function PlanesSection() {
  const [planes, setPlanes] = useState([]);
  const [ciclo, setCiclo] = useState("mensual");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [planContratando, setPlanContratando] = useState(null);

  useEffect(() => {
    obtenerPlanes()
      .then(setPlanes)
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, []);

  return (
    <section id="planes" className="px-30 py-20 bg-bg">
      <p className="text-sm font-bold text-brand tracking-wide">PLANES</p>
      <div className="mt-3 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-4xl font-extrabold text-ink">Un precio por el tamaño de tu institución</h2>
          <p className="mt-3 text-ink-2 max-w-xl">
            Todos los planes incluyen el catálogo, préstamos automáticos, devoluciones y notificaciones. Sin costo por instalación.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 bg-white border border-line rounded-xl p-1">
          <button
            type="button"
            onClick={() => setCiclo("mensual")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              ciclo === "mensual" ? "bg-ink text-white" : "text-ink-2"
            }`}
          >
            Mensual
          </button>
          <button
            type="button"
            onClick={() => setCiclo("anual")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
              ciclo === "anual" ? "bg-ink text-white" : "text-ink-2"
            }`}
          >
            Anual
            <span className="text-brand-2 text-xs">−17%</span>
          </button>
        </div>
      </div>

      {cargando && <p className="mt-10 text-ink-3">Cargando planes…</p>}
      {error && (
        <p className="mt-10 text-red-600">
          No pudimos cargar los planes en este momento. Probá de nuevo más tarde.
        </p>
      )}

      {!cargando && !error && (
        <>
          <div className="mt-10 grid grid-cols-3 gap-6 items-start">
            {planes.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                ciclo={ciclo}
                onContratar={() => setPlanContratando(plan)}
              />
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-3">
            Precios en dólares, por organización. Al contratar se crea tu organización y su cuenta de administrador —{" "}
            <a href="#faq" className="underline hover:text-ink-2">
              cómo funciona
            </a>
            .
          </p>
        </>
      )}

      {planContratando && (
        <ContratacionModal
          plan={planContratando}
          ciclo={ciclo}
          onClose={() => setPlanContratando(null)}
        />
      )}
    </section>
  );
}
