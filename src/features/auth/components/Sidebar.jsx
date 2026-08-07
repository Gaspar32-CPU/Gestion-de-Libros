export function Sidebar () {
    return(
        <div className="relative md:w-1/2 bg-gradient-to-br from-teal-600 to-teal-800 text-white flex flex-col justify-between p-10 md:p-16 overflow-hidden min-h-[420px]">
            {/* Círculos decorativos */}
            <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-teal-500/40 blur-sm" />
            <div className="absolute top-10 right-0 w-40 h-40 rounded-full bg-teal-400/30" />
            <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-teal-700/40 translate-y-1/3" />

            <div className="relative z-10">
            <span className="text-lg font-semibold tracking-wide">Bookly    </span>
            </div>

            <div className="relative z-10 max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Una biblioteca ordenada y a mano.
            </h1>
            <p className="text-teal-50/90 text-base">
                Explorá el catálogo, pedí un libro en segundos<br />
                y seguí tus préstamos sin planillas ni papeleo.
            </p>
            </div>

            <div className="relative z-10 flex gap-10 mt-10">
            <div>
                <p className="text-2xl font-bold">1 clic</p>
                <p className="text-teal-100/80 text-sm">préstamo automático</p>
            </div>
            <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-teal-100/80 text-sm">planillas de Excel</p>
            </div>
            </div>
        </div>
    )
}