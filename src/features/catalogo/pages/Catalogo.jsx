import React, { useState, useEffect, useCallback } from 'react';
import { obtenerLibrosPaginados } from '../catalogoService';
import LibroCard from '../components/LibroCard';
import FiltrosBusqueda from '../components/FiltrosBusqueda';
import LibroDetalle from './LibroDetalle';

export default function Catalogo() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentRole, setCurrentRole] = useState('reader');
  const [simulateApiError, setSimulateApiError] = useState(false);
  
  const [selectedBookId, setSelectedBookId] = useState(null);

  const cargarCatalogo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await obtenerLibrosPaginados({ page: 1, limit: 10, simulateError: simulateApiError });
      setBooks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [simulateApiError]);

  useEffect(() => {
    cargarCatalogo();
  }, [cargarCatalogo]);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedBookId) {
    return (
      <LibroDetalle 
        bookId={selectedBookId} 
        currentRole={currentRole} 
        onBack={() => setSelectedBookId(null)} 
      />
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50 text-slate-800">
      
      {}
      <div className="mb-8 p-4 bg-slate-950 text-white rounded-xl flex flex-wrap gap-4 items-center justify-between text-xs shadow-sm">
        <div>
          <p className="font-bold text-blue-400">CONTROL DE CONTRATO MOCK</p>
          <p className="text-slate-400">Prueba los estados de la interfaz antes de conectar la API</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-slate-300">Rol de usuario:</span>
            <select value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} className="bg-slate-800 border border-slate-700 p-1.5 rounded text-white font-medium focus:outline-none focus:border-blue-500" >
              <option value="reader">Lector (Estandar)</option>
              <option value="admin">Administrador</option>
              <option value="guest">Invitado</option>
            </select>
          </label>
          <button onClick={() => setSimulateApiError(!simulateApiError)} className={`px-3 py-1.5 rounded font-semibold transition-colors ${ simulateApiError ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700' }`} >
            {simulateApiError ? "Detener Error API" : "Forzar Error de Red"}
          </button>
        </div>
      </div>

      {}
      {!error && (
        <FiltrosBusqueda textFilter={searchTerm} onTextChange={setSearchTerm} />
      )}

      {}
      {error && (
        <div className="bg-white border border-slate-200 shadow-sm text-center rounded-xl p-8 my-12 max-w-sm mx-auto">
          <p className="text-slate-700 font-semibold mt-3">{error}</p>
          <p className="text-xs text-slate-400 mb-4 mt-1">La simulacion del backend rechazo la Promesa.</p>
          <button onClick={cargarCatalogo} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors" >
            Intentar de nuevo
          </button>
        </div>
      )}

      {}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-0 animate-pulse h-[380px] flex flex-col">
              <div className="bg-slate-200 aspect-[3/4] w-full rounded-t-xl" />
              <div className="p-4 flex-grow flex flex-col gap-3">
                <div className="bg-slate-200 h-4 rounded w-5/6" />
                <div className="bg-slate-200 h-3 rounded w-1/2" />
                <div className="bg-slate-200 h-3 rounded w-1/3 mt-auto" />
              </div>
            </div>
          ))}
        </div>
      )}

      {}
      {!loading && !error && filteredBooks.length === 0 && (
        <div className="text-center py-16 bg-white border rounded-xl max-w-md mx-auto shadow-sm">
          <p className="text-slate-600 font-medium">No se encontraron resultados</p>
          <p className="text-xs text-slate-400 px-6 mt-1">Intenta ajustando el nombre del libro o autor en la barra superior.</p>
        </div>
      )}

      {}
      {!loading && !error && filteredBooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <LibroCard 
              key={book.id} 
              book={book} 
              currentRole={currentRole} 
              onSelect={(id) => setSelectedBookId(id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
