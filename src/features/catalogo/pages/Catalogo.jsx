import { useOutletContext } from 'react-router-dom';
import Contenedor from '../../carrusel/Contenedor';
import { libros } from '../../libro/libro';
import Select from '../../../components/Select';
import LibroCard from '../components/LibroCard';
import { normalizarTexto } from '../../../utils/normalizarTexto';

export default function Catalogo() {
  // Término de búsqueda controlado desde la barra de búsqueda del header
  const { busqueda = '' } = useOutletContext() ?? {};

  // LÓGICA DE FILTRADO: Filtra los libros por título o autor, ignorando tildes y mayúsculas
  const librosFiltrados = libros.filter((libro) => {
    const termino = normalizarTexto(busqueda);
    return (
      normalizarTexto(libro.titulo).includes(termino) ||
      normalizarTexto(libro.autor).includes(termino)
    );
  });

  const total = librosFiltrados.length;
  // Ajustado para que cuente los disponibles dentro de los libros filtrados
  const disponibles = librosFiltrados.filter((libro) => libro.ejemplaresLibres > 0 || libro.disponible).length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen text-slate-800">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Catálogo</h1>
        <p className="text-sm text-slate-500 mt-1">
          {total} libros encontrados · {disponibles} disponibles ahora
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-3">Nuevos ingresos y más leídos</h2>
        <Contenedor />
      </div>

      {/* Caja de Herramientas: Filtros */}
      <div className="mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-500 font-medium">Filtrar:</span>
        <Select>
          <option>Todos</option>
        </Select>
        <Select>
          <option>Todos</option>
        </Select>
        <Select>
          <option>Ordenar por...</option>
        </Select>
      </div>

      {/* Grilla de resultados: Ahora itera sobre 'librosFiltrados' */}
      {librosFiltrados.length === 0 ? (
        <div className="text-center p-12 bg-white border border-slate-200 rounded-xl text-slate-400 text-sm">
          No se encontraron libros que coincidan con "{busqueda}".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {librosFiltrados.map((libro) => (
            <LibroCard key={libro.id} libro={libro} />
          ))}
        </div>
      )}
    </div>
  );
}
