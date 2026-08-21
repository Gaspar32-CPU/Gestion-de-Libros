// src/features/libro/LibroDetalle.jsx
import React, { useState } from 'react';
import { libros } from "./libro"; // Importa los datos desde libro.js

export const LibroDetalle = () => {
  // Tomamos el primer libro de la lista como base
  const libro = Array.isArray(libros) ? libros[0] : libros;

  // Estados para controlar dinámicamente las reseñas
  const [listaResenas, setListaResenas] = useState(libro?.resenas || []);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [estrellasSeleccionadas, setEstrellasSeleccionadas] = useState(0);

  if (!libro) {
    return <div className="p-8 text-center text-slate-500">No se encontró la información del libro.</div>;
  }

  const renderEstrellas = (nota) => {
    const redondeado = Math.round(nota);
    return "★".repeat(redondeado) + "☆".repeat(5 - redondeado);
  };

  const handleAgregarResena = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim() || estrellasSeleccionadas === 0) return;

    const nueva = {
      iniciales: "TU",
      nombre: "Tu reseña",
      estrellas: estrellasSeleccionadas,
      comentario: nuevoComentario
    };

    setListaResenas([nueva, ...listaResenas]);
    setNuevoComentario("");
    setEstrellasSeleccionadas(0);
  };

  const esDisponible = libro.ejemplaresLibres > 0;

  return (
    <div className="max-w-[1000px] mx-auto font-sans antialiased text-slate-950 p-4">
      <a href="#" className="inline-block no-underline text-[#092e40] font-semibold text-sm mb-6 hover:underline">
        ← Volver al catálogo
      </a>

      <div className="flex flex-col md:flex-row gap-[30px] md:gap-10">
        {/* Columna Izquierda */}
        <div className="w-full md:w-[260px] flex-shrink-0">
          <img 
            src={libro.portadaUrl} 
            alt={`Portada de ${libro.titulo}`} 
            className="w-full h-auto max-h-[380px] md:h-[380px] object-cover rounded-lg mb-[15px] shadow-[0_4px_6px_rgba(0,0,0,0.1)]" 
          />
          <div className="bg-white p-[15px] rounded-lg border border-[#e2e8f0]">
            <span className="bg-[#d1fae5] text-[#065f46] text-xs font-semibold px-2.5 py-1 rounded-full inline-block mb-3">
              Disponible
            </span>
            <div className="flex flex-wrap gap-1 mb-2">
              {Array.from({ length: libro.ejemplaresTotales || 0 }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-4 h-5 rounded-[2px] ${
                    idx < libro.ejemplaresLibres ? 'bg-[#1fa48a]' : 'bg-[#e2e8f0]'
                  }`} 
                />
              ))}
            </div>
            <p className="text-xs text-[#64748b]">
              {libro.ejemplaresLibres} de {libro.ejemplaresTotales} ejemplares libres
            </p>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="flex-grow">
          <span className="text-[#1fa48a] text-[11px] font-bold tracking-[1px] uppercase">
            {libro.genero}
          </span>
          <h1 className="text-[#092e40] text-3xl font-bold mt-1 mb-[5px] tracking-tight">
            {libro.titulo}
          </h1>
          <p className="text-[#64748b] text-sm mb-[15px]">
            {libro.autor} · {libro.anio} · {libro.editorial}
          </p>
          <div className="flex items-center gap-2 text-sm mb-[25px]">
            <span className="text-[#f59e0b] tracking-[2px]">{renderEstrellas(libro.puntuacion)}</span>
            <span className="font-bold text-[#092e40]">{libro.puntuacion}</span>
            <span className="text-[#64748b]">({listaResenas.length} reseñas)</span>
          </div>
          <p className="text-[#64748b] leading-relaxed text-[15px] max-w-[600px] mb-[25px]">
            {libro.descripcion}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 border border-[#e7e5d8] rounded-xl p-5 mb-[25px]">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748b] tracking-[0.5px]">IDIOMA</span>
              <span className="text-sm font-semibold text-[#092e40]">{libro.idioma}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748b] tracking-[0.5px]">SNI / ISBN</span>
              <span className="text-sm font-semibold text-[#092e40]">{libro.isbn}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748b] tracking-[0.5px]">EDITORIAL</span>
              <span className="text-sm font-semibold text-[#092e40]">{libro.editorial}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748b] tracking-[0.5px]">EDICIÓN</span>
              <span className="text-sm font-semibold text-[#092e40]">{libro.edicion}</span>
            </div>
          </div>

          <button 
            disabled={!esDisponible} 
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors cursor-pointer mb-2 bg-[#1fa48a] hover:bg-[#198771]"
          >
            Solicitar préstamo →
          </button>
          <p className="text-xs text-[#64748b] mb-[30px]">{libro.condicionesPrestamo}</p>
          <hr className="border-0 border-t border-[#e7e5d8] mb-[30px]" />

          {/* Sección de entrada: Tu reseña (Colores idénticos a tu mockup) */}
          <div className="bg-[#f5f4ef] rounded-xl p-5 mb-8 border border-[#e8e7e1]">
            <h4 className="text-sm font-bold text-[#092e40] mb-1">Tu reseña</h4>
            <p className="text-xs text-slate-500 mb-4">Leiste este libro. Contá qué te pareció.</p>
            
            <div className="flex items-center gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setEstrellasSeleccionadas(num)}
                  className={`text-2xl cursor-pointer transition-colors ${
                    num <= estrellasSeleccionadas ? 'text-[#f59e0b]' : 'text-slate-300'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-xs text-slate-500 ml-2 font-medium">Elegí una calificación</span>
            </div>

            <form onSubmit={handleAgregarResena} className="space-y-4">
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu opinión sobre el libro aquí..."
                className="w-full p-3 border border-[#e2e8f0] rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1fa48a] bg-white min-h-[90px] resize-none"
              />
              <button
                type="submit"
                disabled={!nuevoComentario.trim() || estrellasSeleccionadas === 0}
                className="px-5 py-2 bg-[#1fa48a] hover:bg-[#198771] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Enviar Reseña
              </button>
            </form>
          </div>

          {/* Listado de Reseñas */}
          <h3 className="text-[#092e40] text-lg font-bold mb-5">Reseñas</h3>
          <div className="space-y-5">
            {listaResenas.map((resena, idx) => (
              <div key={idx} className="flex gap-[15px]">
                <div className="w-[35px] h-[35px] bg-[#84cc16] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {resena.iniciales}
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-[#092e40] flex items-center gap-1.5">
                    {resena.nombre}
                    <span className="text-[#f59e0b] text-[10px] ml-1 tracking-[1px]">
                      {renderEstrellas(resena.estrellas)}
                    </span>
                  </p>
                  <p className="text-sm text-[#64748b] mt-[3px]">{resena.comentario}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

