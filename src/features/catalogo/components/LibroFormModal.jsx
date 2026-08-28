import { useState } from 'react';
import { Close, KeyboardArrowDown } from '@mui/icons-material';
import PortadaInput from './PortadaInput';
import BusquedaIsbn from './BusquedaIsbn';

const IDIOMAS = ['Español', 'Inglés', 'Portugués', 'Francés', 'Otro'];

const LIBRO_VACIO = {
  portadaUrl: '',
  titulo: '',
  autor: '',
  genero: '',
  editorial: '',
  anio: '',
  idioma: 'Español',
  codigoInterno: '',
  isbn: '',
  descripcion: '',
  ejemplaresTotales: '',
  ejemplaresLibres: '',
};

export default function LibroFormModal({ libro, onGuardar, onCerrar }) {
  const esEdicion = Boolean(libro?.id);
  const [modo, setModo] = useState('manual'); // 'manual' | 'isbn' — solo aplica al crear
  const [form, setForm] = useState({ ...LIBRO_VACIO, ...libro });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePortadaChange = (portadaUrl) => {
    setForm((prev) => ({ ...prev, portadaUrl }));
  };

  const handleEncontradoPorIsbn = (datos) => {
    setForm((prev) => ({ ...prev, ...datos }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.titulo.trim() || !form.autor.trim() || !form.genero.trim()) {
      setError('Título, autor y género son obligatorios.');
      return;
    }

    let ejemplaresTotales;
    let ejemplaresLibres;

    if (esEdicion) {
      ejemplaresTotales = Number(form.ejemplaresTotales);
      ejemplaresLibres = Number(form.ejemplaresLibres);

      if (!Number.isInteger(ejemplaresTotales) || ejemplaresTotales < 0) {
        setError('Los ejemplares totales deben ser un número entero mayor o igual a 0.');
        return;
      }
      if (!Number.isInteger(ejemplaresLibres) || ejemplaresLibres < 0 || ejemplaresLibres > ejemplaresTotales) {
        setError('Los ejemplares libres no pueden ser mayores a los ejemplares totales.');
        return;
      }
    } else {
      const stock = Number(form.stock);
      if (!Number.isInteger(stock) || stock < 0) {
        setError('El stock debe ser un número entero mayor o igual a 0.');
        return;
      }
      ejemplaresTotales = stock;
      ejemplaresLibres = stock;
    }

    // eslint-disable-next-line no-unused-vars
    const { stock, ...datosLibro } = form;

    onGuardar({
      ...datosLibro,
      anio: form.anio ? Number(form.anio) : undefined,
      ejemplaresTotales,
      ejemplaresLibres,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onCerrar}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-slate-900">
            {esEdicion ? 'Editar libro' : 'Crear libro'}
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <Close fontSize="small" />
          </button>
        </div>

        {!esEdicion && (
          <div className="px-6 pt-4">
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
              <button
                type="button"
                onClick={() => setModo('manual')}
                className={`px-3.5 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition-colors ${
                  modo === 'manual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Carga manual
              </button>
              <button
                type="button"
                onClick={() => setModo('isbn')}
                className={`px-3.5 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition-colors ${
                  modo === 'isbn' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Buscar por ISBN
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!esEdicion && modo === 'isbn' && (
            <BusquedaIsbn onEncontrado={handleEncontradoPorIsbn} />
          )}

          <PortadaInput value={form.portadaUrl} onChange={handlePortadaChange} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Campo label="Título" name="titulo" value={form.titulo} onChange={handleChange} required />
            <Campo label="Autor" name="autor" value={form.autor} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Campo label="Género" name="genero" value={form.genero} onChange={handleChange} required />
            <Campo label="Editorial" name="editorial" value={form.editorial} onChange={handleChange} />
            <Campo label="Año de publicación" name="anio" type="number" value={form.anio} onChange={handleChange} />
            <div>
              <label htmlFor="idioma" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Idioma
              </label>
              <div className="relative">
                <select
                  id="idioma"
                  name="idioma"
                  value={form.idioma}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#1fa48a] focus:ring-1 focus:ring-[#1fa48a]"
                >
                  {IDIOMAS.map((idioma) => (
                    <option key={idioma} value={idioma}>{idioma}</option>
                  ))}
                </select>
                <KeyboardArrowDown
                  fontSize="small"
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Campo label="Código interno" name="codigoInterno" value={form.codigoInterno} onChange={handleChange} />
            <Campo label="SNI / ISBN" name="isbn" value={form.isbn} onChange={handleChange} />
            {esEdicion ? (
              <>
                <Campo label="Ejemplares totales" name="ejemplaresTotales" type="number" value={form.ejemplaresTotales} onChange={handleChange} required />
                <Campo label="Ejemplares libres" name="ejemplaresLibres" type="number" value={form.ejemplaresLibres} onChange={handleChange} required />
              </>
            ) : (
              <Campo label="Stock (ejemplares)" name="stock" type="number" value={form.stock} onChange={handleChange} required />
            )}
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Resumen
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#1fa48a] focus:ring-1 focus:ring-[#1fa48a] resize-none"
            />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1fa48a] hover:bg-[#198771] cursor-pointer"
            >
              {esEdicion ? 'Guardar cambios' : 'Crear libro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Campo({ label, name, value, onChange, type = 'text', required = false, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#1fa48a] focus:ring-1 focus:ring-[#1fa48a]"
      />
    </div>
  );
}
