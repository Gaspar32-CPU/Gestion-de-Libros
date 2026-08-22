import React from 'react';

export default function FiltrosBusqueda({ textFilter, onTextChange }) {
  return (
    <div className="mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="max-w-md">
        <label htmlFor="search" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Buscar en el catalogo
        </label>
        <div className="relative">
          <input
            id="search"
            type="text"
            value={textFilter}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Buscar por titulo o autor..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
