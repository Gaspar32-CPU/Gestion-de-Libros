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
                    <a href="#planes" className="mt-6 inline-block bg-brand py-3 px-6 rounded-xl border border-line text-white shadow-[0_6px_16px_-8px_var(--color-brand)] text-bold hover:bg-brand-dark">Ver planes y contratar</a>
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
            <div className="w-1/2"></div>
        </section>
    )
}