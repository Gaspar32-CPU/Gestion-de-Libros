import { useEffect, useState } from 'react'
import { obtenerPlanes } from '../../../services/planes'
import { PricingCard } from './PricingCard'
import { ContratacionModal } from './ContratacionModal'

export function PlanesSection() {
  const [planes, setPlanes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [planContratando, setPlanContratando] = useState(null)

  useEffect(() => {
    obtenerPlanes()
      .then((data) => {
        if (!Array.isArray(data))
          throw new Error('Respuesta inesperada de /planes')
        setPlanes(data)
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false))
  }, [])

  return (
    <section
      id="planes"
      className="px-4 md:px-12 lg:px-30 py-16 lg:py-20 bg-bg"
    >
      <p className="text-sm font-bold text-brand tracking-wide">PLANES</p>
      <div className="mt-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-ink">
          Un precio por el tamaño de tu institución
        </h2>
        <p className="mt-3 text-ink-2 max-w-xl">
          Todos los planes incluyen el catálogo, préstamos automáticos,
          devoluciones y notificaciones. Sin costo por instalación.
        </p>
      </div>

      {cargando && <p className="mt-10 text-ink-3">Cargando planes…</p>}
      {error && (
        <p className="mt-10 text-red-600">
          No pudimos cargar los planes en este momento. Probá de nuevo más
          tarde.
        </p>
      )}

      {!cargando && !error && (
        <>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {planes.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onContratar={() => setPlanContratando(plan)}
              />
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-3">
            Precios en pesos uruguayos, por organización. Al contratar se crea tu
            organización y su cuenta de administrador —{' '}
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
          ciclo="mensual"
          onClose={() => setPlanContratando(null)}
        />
      )}
    </section>
  )
}
