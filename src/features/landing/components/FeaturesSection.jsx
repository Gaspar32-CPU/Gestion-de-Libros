const PROBLEMAS = [
  {
    tachado: "Planilla compartida",
    titulo: "Catálogo que se ve",
    descripcion:
      "Portadas, géneros y disponibilidad en tiempo real, buscables desde cualquier celular.",
  },
  {
    tachado: "Pedir por WhatsApp",
    titulo: "Préstamo en un clic",
    descripcion:
      "Si hay stock, el sistema aprueba solo y asigna lugar y fecha de retiro. Sin bandeja de pendientes.",
  },
  {
    tachado: "Nadie sabe qué falta",
    titulo: "Devoluciones bajo control",
    descripcion:
      "Avisos a los 10 días y al día previo, alertas de atraso y reportes de quién tiene qué.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-ink px-30 py-20">
      <p className="text-sm font-bold text-brand-2 tracking-wide">EL PROBLEMA</p>
      <h2 className="mt-3 text-4xl font-extrabold leading-tight text-white max-w-2xl">
        Una planilla de Excel no es un sistema de biblioteca.
      </h2>
      <p className="mt-4 text-ink-3 max-w-2xl">
        Sin control de devoluciones, con catálogo invisible y préstamos que dependen de que alguien se acuerde. El resultado: libros que no circulan.
      </p>

      <div className="mt-10 grid grid-cols-3 gap-6">
        {PROBLEMAS.map((problema) => (
          <div
            key={problema.titulo}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm text-ink-3 line-through decoration-ink-3/60">
              {problema.tachado} <span className="no-underline">→</span>
            </p>
            <h3 className="mt-4 text-xl font-extrabold text-white">{problema.titulo}</h3>
            <p className="mt-2 text-sm text-ink-3">{problema.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
