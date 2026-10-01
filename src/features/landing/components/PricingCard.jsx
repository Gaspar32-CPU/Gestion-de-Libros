export function PricingCard({ plan, ciclo, onContratar }) {
  const esAnual = ciclo === "anual";
  const precio = esAnual ? plan.precioAnual : plan.precioMensual;
  const equivalenteMensual = Math.round(plan.precioAnual / 12);

  return (
    <div
      className={`relative rounded-2xl border bg-white p-6 flex flex-col ${
        plan.destacado ? "border-brand shadow-xl" : "border-line"
      }`}
    >
      {plan.destacado && plan.etiquetaDestacado && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink text-white text-xs font-bold px-3 py-1 rounded-full">
          {plan.etiquetaDestacado}
        </span>
      )}

      <div className="flex items-center gap-2">
        <span className="text-2xl">{plan.icono}</span>
        <div>
          <h3 className="text-lg font-extrabold text-ink leading-none">{plan.nombre}</h3>
          <p className="text-xs text-ink-3">{plan.tagline}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-2">{plan.descripcion}</p>

      <div className="mt-5 pt-5 border-t border-line">
        <p className="flex items-end gap-1">
          <span className="text-sm font-bold text-ink-2">US$</span>
          <span className="text-4xl font-extrabold text-ink">{precio}</span>
          <span className="text-sm text-ink-3">/{esAnual ? "año" : "mes"}</span>
        </p>
        <p className="mt-1 text-xs text-ink-3">
          {esAnual
            ? `Equivale a US$ ${equivalenteMensual}/mes · 2 meses sin cargo`
            : "Facturación mensual, sin contrato mínimo"}
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-line grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-lg font-extrabold text-ink">{plan.limites.usuarios.toLocaleString("es-UY")}</p>
          <p className="text-xs text-ink-3">usuarios</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-ink">{plan.limites.admins}</p>
          <p className="text-xs text-ink-3">admins</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-ink">{plan.limites.titulos.toLocaleString("es-UY")}</p>
          <p className="text-xs text-ink-3">títulos</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2 flex-1">
        {plan.caracteristicas.map((caracteristica) => (
          <li key={caracteristica} className="flex items-start gap-2 text-sm text-ink-2">
            <span className="text-brand font-bold">✓</span>
            {caracteristica}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onContratar}
        className={`mt-6 w-full py-3 rounded-xl font-bold transition-all duration-300 active:translate-y-1 ${
          plan.destacado
            ? "bg-brand text-white shadow-[0_6px_16px_-8px_var(--color-brand)] hover:bg-brand-d"
            : "bg-white border border-line text-ink hover:bg-gray-100"
        }`}
      >
        Contratar {plan.nombre}
      </button>
      <button type="button" className="mt-2 text-sm font-bold text-ink-2 hover:text-ink">
        Ver detalle del plan
      </button>
    </div>
  );
}
