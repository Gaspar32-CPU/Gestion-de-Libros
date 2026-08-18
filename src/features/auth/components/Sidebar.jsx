import { Link } from "react-router-dom";

export function Sidebar () {
    return(
        <div className="relative flex justify-center md:w-1/2 bg-linear-to-br from-teal-600 to-teal-800 text-white flex-col p-10 md:p-16 overflow-hidden min-h-105">
            {/* Círculos decorativos */}
            <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-teal-500/40 blur-sm" />
            <div className="absolute top-10 right-0 w-40 h-40 rounded-full bg-teal-400/30" />
            <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-teal-700/40 translate-y-1/3" />

            <Link to="/" className="absolute left-6 top-6 ml-2 text-2xl font-semibold tracking-wide md:left-8 md:top-8">
                Bookly
            </Link>

            <h1 className="mb-5 max-w-120 text-left text-4xl font-bold leading-tight md:text-[3.2rem]">
                Una biblioteca ordenada y a mano.
            </h1>

            <p className="mb-12 max-w-105 text-left text-base leading-relaxed text-white/85">
                Explorá el catálogo, pedí un libro en segundos y seguí tus préstamos
                sin planillas ni papeleo.
            </p>

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