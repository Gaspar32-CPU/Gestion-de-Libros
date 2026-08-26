import React, { useState } from 'react';
import { misPrestamosMock } from './prestamosData';

export  default function MisPrestamos  ()  {
  const [prestamos] = useState(misPrestamosMock);
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const prestamosFiltrados = filtroEstado === 'TODOS' 
    ? prestamos 
    : prestamos.filter(p => p.estado === filtroEstado);

  const obtenerEstiloEstado = (estado) => {
    switch (estado) {
      case 'ACTIVO': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'VENCIDO': return 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return 'Pendiente';
    const [anio, mes, dia] = fechaStr.split('-');
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 font-sans text-slate-900">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#1fa48a] uppercase tracking-wider">Mi Espacio Personal</span>
            <h1 className="text-2xl font-black text-[#092e40] tracking-tight mt-0.5">Mis Préstamos</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
            {['TODOS', 'ACTIVO', 'VENCIDO'].map((est) => (
              <button
                key={est}
                onClick={() => setFiltroEstado(est)}
                className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                  filtroEstado === est ? 'bg-white text-[#092e40] shadow-xs' : 'text-slate-500'
                }`}
              >
                {est === 'TODOS' ? 'Todos' : est}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-400 text-xs font-bold tracking-wider">
              <th className="p-4 w-16">LIBRO</th>
              <th className="p-4">DETALLES</th>
              <th className="p-4">PLAZO MÁXIMO</th>
              <th className="p-4 text-center">ESTADO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-[#092e40]">
            {prestamosFiltrados.map((item) => (
              <tr key={item.id}>
                <td className="p-4">
<img src={item.libro.portadaUrl}
  alt={`Portada de ${item.libro.titulo}`}
  className="w-10 h-14 object-cover rounded bg-slate-100 border border-slate-200"
/>                </td>
                <td className="p-4">
                  <p className="font-bold text-slate-900 leading-tight">{item.libro.titulo}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.libro.autor}</p>
                </td>
                <td className="p-4 text-xs">
                  <p className={`font-bold ${item.estado === 'VENCIDO' ? 'text-rose-600' : 'text-slate-700'}`}>
                    {formatearFecha(item.fechaMaxima)}
                  </p>
                </td>
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide border ${obtenerEstiloEstado(item.estado)}`}>
                    {item.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
