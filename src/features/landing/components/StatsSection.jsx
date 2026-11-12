const STATS = [
  {
    valor: '2 → 18',
    titulo: 'préstamos por semana',
    detalle:
      'Lo que pasa al dejar la planilla: más libros en circulación porque pedirlos es fácil.',
  },
  {
    valor: '1 clic',
    titulo: 'préstamo automático',
    detalle:
      'El lector pide el libro y, si hay stock, se aprueba solo. Nadie tiene que revisar pendientes.',
  },
  {
    valor: '1 semana',
    titulo: 'para empezar a funcionar',
    detalle:
      'Desde que contratás el plan hasta el primer préstamo, con tu catálogo ya cargado.',
  },
]

export function StatsSection() {
  return (
    <section className="px-4 md:px-12 lg:px-30 py-12 lg:pt-16 bg-bg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat) => (
          <div
            key={stat.titulo}
            className="rounded-2xl bg-white border border-line p-6 border-l-4 border-l-brand"
          >
            <p className="text-4xl font-extrabold text-brand-d">{stat.valor}</p>
            <p className="mt-2 text-base font-bold text-ink">{stat.titulo}</p>
            <p className="mt-1 text-sm text-ink-2">{stat.detalle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
