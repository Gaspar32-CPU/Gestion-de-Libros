import {
  precioDelPlan,
  precioSinDescuento,
  descuentoDelPlan,
  funcionalidadesDelPlan,
  limiteDelPlan,
} from '../planes'

export function PricingCard({ plan, onContratar }) {
  const precio = precioDelPlan(plan, 'mensual')
  const descuento = descuentoDelPlan(plan)
  const funcionalidades = funcionalidadesDelPlan(plan)

  return (
    <div className="relative rounded-2xl border border-line bg-white p-6 flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-extrabold text-ink leading-none">
          {plan.nombre}
        </h3>
        {descuento > 0 && (
          <span className="rounded-full bg-brand-2/15 px-2.5 py-1 text-xs font-bold text-brand-2">
            −{descuento}%
          </span>
        )}
      </div>

      {plan.descripcion && (
        <p className="mt-4 text-sm text-ink-2">{plan.descripcion}</p>
      )}

      <div className="mt-5 pt-5 border-t border-line">
        <p className="flex items-end gap-1">
          <span className="text-sm font-bold text-ink-2">$</span>
          <span className="text-4xl font-extrabold text-ink">{precio}</span>
          <span className="text-sm text-ink-3">/mes</span>
          {descuento > 0 && (
            <span className="ml-1 text-sm text-ink-3 line-through">
              $ {precioSinDescuento(plan, 'mensual')}
            </span>
          )}
        </p>
        <p className="mt-1 text-xs text-ink-3">
          Facturación mensual, sin contrato mínimo
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-line grid grid-cols-2 gap-2 text-center">
        <div>
          <p className="text-lg font-extrabold text-ink">
            {limiteDelPlan(plan, 'usuarios')}
          </p>
          <p className="text-xs text-ink-3">usuarios</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-ink">Ilimitados</p>
          <p className="text-xs text-ink-3">títulos</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2 flex-1">
        {funcionalidades.map(({ nombre, incluida }) => (
          <li
            key={nombre}
            className={`flex items-start gap-2 text-sm ${incluida ? 'text-ink-2' : 'text-ink-3'}`}
          >
            <span className={incluida ? 'text-brand font-bold' : ''}>
              {incluida ? '✓' : '–'}
            </span>
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
    </div>
  )
}
