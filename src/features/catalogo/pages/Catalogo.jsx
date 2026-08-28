import React, { useState } from 'react';
import Contenedor from '../../carrusel/Contenedor';
import { libros } from '../../libro/libro';
import Select from '../../../components/Select';
import LibroCard from '../components/LibroCard';

export default function Catalogo() {
  // NUEVO ESTADO: Captura el término de búsqueda en tiempo real
  const [busqueda, setBusqueda] = useState('');

  // LÓGICA DE FILTRADO: Filtra los libros por título o autor según lo que escriba el usuario
  const librosFiltrados = libros.filter((libro) => {
    const termino = busqueda.toLowerCase();
    return (
      libro.titulo?.toLowerCase().includes(termino) ||
      libro.autor?.toLowerCase().includes(termino)
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

      {/* Caja de Herramientas: Filtros y NUEVA Barra de búsqueda integrada */}
      <div className="mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Lado izquierdo: Selects de filtrado originales de tu compañero */}
        <div className="flex flex-wrap items-center gap-3">
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

        {/* NUEVO ELEMENTO: Barra de búsqueda dentro de la caja de filtros */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título o autor..."
            className="w-full py-2 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand focus:bg-white transition-colors"
          />
          {/* Icono de Lupa SVG */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="11" cy="12" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>

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
