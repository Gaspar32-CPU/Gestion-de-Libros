import { LibroSugerencia } from '../../carrusel/LibroSugerencia';
import Contenedor from '../../carrusel/Contenedor';
import { libros } from '../../libro/libro';

export default function Catalogo() {
  const total = libros.length;
  const disponibles = libros.filter((libro) => libro.disponible).length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen text-slate-800">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Catálogo</h1>
        <p className="text-sm text-slate-500 mt-1">
          {total} libros · {disponibles} disponibles ahora
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-3">Nuevos ingresos y más leídos</h2>
        <Contenedor/>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {libros.map((libro) => (
          <LibroSugerencia key={libro.id} portadaUrl={libro.portadaUrl} titulo={libro.titulo} genero={libro.genero} autor={libro.autor} />
        ))}
      </div>
    </div>
  );
}
