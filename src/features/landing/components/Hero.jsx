const LIBROS_PREVIEW = [
    { titulo: "Cien años de soledad", autor: "García Márquez", disponible: false, color: "bg-amber-700" },
    { titulo: "Fahrenheit 451", autor: "Ray Bradbury", disponible: true, color: "bg-orange-700" },
    { titulo: "El principito", autor: "Saint-Exupéry", disponible: true, color: "bg-blue-600" },
    { titulo: "Ficciones", autor: "J. L. Borges", disponible: true, color: "bg-purple-700" },
];

export function Hero() {
    return (
        <section className="flex w-full px-30 bg-bg">
            <div className="flex flex-col gap-10 w-1/2 py-20">
                <div className="w-fit text-xs font-bold text-ink-2 inline-flex items-center gap-2 bg-white border border-line rounded-full px-4 py-1 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-2"></span>
                    <span className="text-sm font-medium text-ink-2">Para instituciones educativas y bibliotecas</span>
                </div>
                <div>
                    <h1 className="text-5xl font-extrabold leading-none text-ink">La biblioteca de</h1>
                    <h1 className="text-5xl font-extrabold leading-none text-ink">tu institución,</h1>
                    <h1 className="text-5xl font-extrabold leading-none text-brand-d">ordenada de verdad<span className="text-ink">.</span></h1>
                    <p className="mt-6 text-lg text-gray-500 max-w-md">Catálogo visible, préstamos automáticos y devoluciones bajo control. Elegí el plan según el tamaño de tu institución y empezá esta semana.</p>
                    <a href="#planes" className="mt-6 inline-block bg-brand py-3 px-6 rounded-xl border border-line text-white shadow-[0_6px_16px_-8px_var(--color-brand)] text-bold hover:bg-brand-dark">Ver planes</a>
                </div>
                <div className="flex items-center pt-8 border-t border-line gap-4">
                    <div>
                        <p className="text-2xl font-extrabold text-brand-d">2 → 18</p>
                        <p className="text-sm text-gray-500">préstamos por semana</p>
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-brand-d">1 clic</p>
                        <p className="text-sm text-gray-500">préstamo automático</p>
                    </div>
                    <div>
                        <p className="text-2xl font-extrabold text-brand-d">1 semana</p>
                        <p className="text-sm text-gray-500">para estar en vivo</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex items-center">
                <div className="w-full rounded-2xl border border-line bg-white shadow-xl overflow-hidden">
                    <div className="flex items-center gap-2 bg-ink px-4 py-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span>
                        <span className="ml-2 text-sm font-bold text-white">Bookly · Biblioteca Ánima</span>
                    </div>
                    <div className="p-5">
                        <div className="rounded-xl border border-line bg-bg px-4 py-2 text-sm text-ink-3">
                            ⌕ Buscar por título, autor o género…
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {LIBROS_PREVIEW.map((libro) => (
                                <div key={libro.titulo} className="flex items-start gap-3 rounded-xl border border-line p-3">
                                    <div className={`w-9 h-12 rounded ${libro.color} shrink-0`}></div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-ink truncate">{libro.titulo}</p>
                                        <p className="text-xs text-ink-3 truncate">{libro.autor}</p>
                                        <span
                                            className={`mt-1 inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                                libro.disponible
                                                    ? "bg-brand-2/20 text-brand-d"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {libro.disponible ? "Disponible" : "No disponible"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}