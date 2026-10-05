import { precioDelPlan, equivalenteMensualAnual, funcionalidadesDelPlan, limiteDelPlan } from "../planes";

export function PricingCard({ plan, ciclo, onContratar }) {
  const esAnual = ciclo === "anual";
  const precio = precioDelPlan(plan, ciclo);
  const funcionalidades = funcionalidadesDelPlan(plan);

  return (
    <div className="relative rounded-2xl border border-line bg-white p-6 flex flex-col">
      <h3 className="text-lg font-extrabold text-ink leading-none">{plan.nombre}</h3>

      {plan.descripcion && <p className="mt-4 text-sm text-ink-2">{plan.descripcion}</p>}

      <div className="mt-5 pt-5 border-t border-line">
        <p className="flex items-end gap-1">
          <span className="text-sm font-bold text-ink-2">US$</span>
          <span className="text-4xl font-extrabold text-ink">{precio}</span>
          <span className="text-sm text-ink-3">/{esAnual ? "año" : "mes"}</span>
        </p>
        <p className="mt-1 text-xs text-ink-3">
          {esAnual
            ? `Equivale a US$ ${equivalenteMensualAnual(plan)}/mes · 2 meses sin cargo`
            : "Facturación mensual, sin contrato mínimo"}
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-line grid grid-cols-2 gap-2 text-center">
        <div>
          <p className="text-lg font-extrabold text-ink">{limiteDelPlan(plan, "usuarios")}</p>
          <p className="text-xs text-ink-3">usuarios</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-ink">{limiteDelPlan(plan, "titulos")}</p>
          <p className="text-xs text-ink-3">títulos</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2 flex-1">
        {funcionalidades.map(({ nombre, incluida }) => (
          <li key={nombre} className={`flex items-start gap-2 text-sm ${incluida ? "text-ink-2" : "text-ink-3"}`}>
            <span className={incluida ? "text-brand font-bold" : ""}>{incluida ? "✓" : "–"}</span>
            {nombre}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onContratar}
        className="mt-6 w-full py-3 rounded-xl font-bold transition-all duration-300 active:translate-y-1 bg-white border border-line text-ink hover:bg-gray-100"
      >
        Contratar {plan.nombre}
      </button>
      <button type="button" className="mt-2 text-sm font-bold text-ink-2 hover:text-ink">
        Ver detalle del plan
      </button>
    </div>
  );
}
