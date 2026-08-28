import { useEffect, useMemo, useState } from 'react';
import Contenedor from '../../carrusel/Contenedor';
import LibroCard from '../components/LibroCard';
import FiltrosBusqueda from '../components/FiltrosBusqueda';
import { obtenerLibros } from '../catalogoService';

const COMPARADORES = {
  titulo: (a, b) => a.titulo.localeCompare(b.titulo),
  autor: (a, b) => a.autor.localeCompare(b.autor),
  puntuacion: (a, b) => b.puntuacion - a.puntuacion,
  anio: (a, b) => b.anio - a.anio,
};

export default function Catalogo() {
  const [libros, setLibros] = useState([]);
  const [generoFilter, setGeneroFilter] = useState('Todos');
  const [disponibilidadFilter, setDisponibilidadFilter] = useState('Todos');
  const [ordenarPor, setOrdenarPor] = useState('relevancia');

  useEffect(() => {
    obtenerLibros()
      .then(setLibros)
      .catch((err) => console.error('Error al traer el catálogo', err));
  }, []);

  const generos = useMemo(
    () => ['Todos', ...new Set(libros.map((libro) => libro.genero))],
    [libros]
  );

  const total = libros.length;
  const disponibles = libros.filter((libro) => libro.ejemplaresLibres > 0).length;

  const librosFiltrados = useMemo(() => {
    const resultado = libros.filter((libro) => {
      const coincideGenero = generoFilter === 'Todos' || libro.genero === generoFilter;

      const disponible = libro.ejemplaresLibres > 0;
      const coincideDisponibilidad =
        disponibilidadFilter === 'Todos' ||
        (disponibilidadFilter === 'Disponible' && disponible) ||
        (disponibilidadFilter === 'No disponible' && !disponible);

      return coincideGenero && coincideDisponibilidad;
    });

    const comparador = COMPARADORES[ordenarPor];
    return comparador ? [...resultado].sort(comparador) : resultado;
  }, [libros, generoFilter, disponibilidadFilter, ordenarPor]);

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
        <Contenedor libros={libros}/>
      </div>

      <FiltrosBusqueda
        generos={generos}
        generoFilter={generoFilter}
        onGeneroChange={setGeneroFilter}
        disponibilidadFilter={disponibilidadFilter}
        onDisponibilidadChange={setDisponibilidadFilter}
        ordenarPor={ordenarPor}
        onOrdenarChange={setOrdenarPor}
      />

      {librosFiltrados.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-12">
          No se encontraron libros con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {librosFiltrados.map((libro) => (
            <LibroCard key={libro.id} libro={libro}/>
          ))}
        </div>
      )}
    </div>
  );
}
