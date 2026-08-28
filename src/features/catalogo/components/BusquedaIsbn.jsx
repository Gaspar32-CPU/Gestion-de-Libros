import { useState } from 'react';
import { isbnSchema } from '../../../../schemas/book.schema';

export default function BusquedaIsbn({ onEncontrado }) {
  const [isbn, setIsbn] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [libroEncontrado, setLibroEncontrado] = useState(null);

  const handleBuscar = async (e) => {
    e.preventDefault();
    setError('');
    setLibroEncontrado(null);

    const result = isbnSchema.safeParse({ isbn });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/libros/isbn/${result.data.isbn}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'No se encontró ningún libro con ese ISBN.');
      }

      const data = await res.json();
      setLibroEncontrado(data.libro);
      onEncontrado({
        titulo: data.libro.titulo ?? '',
        autor: data.libro.autor ?? '',
        anio: data.libro.anio ?? '',
        genero: data.libro.genero ?? '',
        editorial: data.libro.editorial ?? '',
        descripcion: data.libro.descripcion ?? '',
        portadaUrl: data.libro.portada ?? '',
        isbn: result.data.isbn,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label htmlFor="busqueda-isbn" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            ISBN del libro
          </label>
          <input
            id="busqueda-isbn"
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="978-84-376-0494-7"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#1fa48a] focus:ring-1 focus:ring-[#1fa48a]"
          />
        </div>
        <button
          type="button"
          onClick={handleBuscar}
          disabled={loading}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1fa48a] hover:bg-[#198771] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Consultamos la base bibliográfica y traemos título, autor, editorial, año y resumen. El stock y el código interno los completás vos.
      </p>

      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}

      {libroEncontrado && (
        <div className="mt-3 flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
          {libroEncontrado.portada && (
            <img
              src={libroEncontrado.portada}
              alt={`Portada de ${libroEncontrado.titulo}`}
              className="h-20 w-14 rounded object-cover shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{libroEncontrado.titulo}</p>
            <p className="text-xs text-slate-500 truncate">{libroEncontrado.autor}</p>
            <p className="text-xs text-slate-400 mt-1">Se completaron los campos de abajo. Revisalos antes de guardar.</p>
          </div>
        </div>
      )}
    </div>
  );
}
