import LibroCardVisual from '../components/LibroCardVisual';
import { librosDestacados, librosCatalogo } from '../data/librosVisual';

export default function Catalogo() {
  const total = librosCatalogo.length;
  const disponibles = librosCatalogo.filter((libro) => libro.disponible).length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50 text-slate-800">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Catálogo</h1>
        <p className="text-sm text-slate-500 mt-1">
          {total} libros · {disponibles} disponibles ahora
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-3">Nuevos ingresos y más leídos</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {librosDestacados.map((libro) => (
            <div
              key={libro.id}
              className={`shrink-0 w-40 h-52 rounded-xl bg-linear-to-br ${libro.color} p-4 flex flex-col justify-between shadow-sm`}
            >
              <span className="text-[11px] font-bold tracking-wide text-white/80">{libro.categoria}</span>
              <div>
                <p className="text-white font-bold text-base leading-snug">{libro.titulo}</p>
                {libro.autor && <p className="text-white/70 text-xs mt-1">{libro.autor}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-500 font-medium">Filtrar:</span>
        <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700">
          <option>Todos</option>
        </select>
        <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700">
          <option>Todos</option>
        </select>
        <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700">
          <option>Ordenar por...</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {librosCatalogo.map((libro) => (
          <LibroCardVisual key={libro.id} book={libro} />
        ))}
      </div>
    </div>
  );
}
