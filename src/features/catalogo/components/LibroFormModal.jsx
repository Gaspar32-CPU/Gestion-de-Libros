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
  idioma: '',
  codigoInterno: '',
  isbn: '',
  descripcion: '',
  ejemplaresTotales: '',
  ejemplaresLibres: '',
};

export default function LibroFormModal({ libro, onGuardar, onCerrar, errorExterno }) {
  const esEdicion = Boolean(libro?.id);
  const [modo, setModo] = useState('manual'); // 'manual' | 'isbn' — solo aplica al crear
  const [isbnListo, setIsbnListo] = useState(false);
  const [form, setForm] = useState({ ...LIBRO_VACIO, ...libro });
  const [error, setError] = useState('');

  // En modo ISBN, el resto del formulario se muestra recién cuando la
  // búsqueda encontró un libro (o siempre, si es edición o carga manual).
  const mostrarCampos = esEdicion || modo === 'manual' || isbnListo;

  const handleModoChange = (nuevoModo) => {
    setModo(nuevoModo);
    if (nuevoModo === 'isbn') setIsbnListo(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePortadaChange = (portadaUrl) => {
    setForm((prev) => ({ ...prev, portadaUrl }));
  };

  const handleEncontradoPorIsbn = (datos) => {
    setForm((prev) => ({ ...prev, ...datos }));
    setIsbnListo(true);
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
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {esEdicion ? 'Editar libro' : 'Alta de libro'}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {esEdicion ? 'Actualizá los datos del ejemplar' : 'Completá los datos del ejemplar'}
            </p>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700 cursor-pointer"
          >
            <Close fontSize="small" />
          </button>
        </div>

        {!esEdicion && (
          <div className="grid grid-cols-2 gap-3 px-6 pt-4">
            <ModoCard
              titulo="Carga manual"
              descripcion="Completás todos los datos"
              activo={modo === 'manual'}
              onClick={() => handleModoChange('manual')}
            />
            <ModoCard
              titulo="Buscar por ISBN"
              descripcion="Los datos se traen automáticamente"
              activo={modo === 'isbn'}
              onClick={() => handleModoChange('isbn')}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!esEdicion && modo === 'isbn' && (
            <BusquedaIsbn onEncontrado={handleEncontradoPorIsbn} />
          )}

          {mostrarCampos && (
            <>
              <PortadaInput value={form.portadaUrl} onChange={handlePortadaChange} titulo={form.titulo} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Campo label="Título" name="titulo" value={form.titulo} onChange={handleChange} placeholder="Ej. Cien años de soledad" required />
                <Campo label="Autor" name="autor" value={form.autor} onChange={handleChange} placeholder="Ej. Gabriel García Márquez" required />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Campo label="Género" name="genero" value={form.genero} onChange={handleChange} placeholder="Ej. Novela" required />
                <Campo label="Editorial" name="editorial" value={form.editorial} onChange={handleChange} placeholder="Ej. Sudamericana" />
                <Campo label="Año de publicación" name="anio" type="number" value={form.anio} onChange={handleChange} placeholder="Ej. 1967" />
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
                      <option value="" disabled>Seleccioná un idioma</option>
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
                <Campo label="Código interno" name="codigoInterno" value={form.codigoInterno} onChange={handleChange} placeholder="Ej. NOV-014" />
                <Campo label="SNI / ISBN" name="isbn" value={form.isbn} onChange={handleChange} placeholder="Ej. 978-84-376-0494-7" />
                {esEdicion ? (
                  <>
                    <Campo label="Ejemplares totales" name="ejemplaresTotales" type="number" value={form.ejemplaresTotales} onChange={handleChange} required />
                    <Campo label="Ejemplares libres" name="ejemplaresLibres" type="number" value={form.ejemplaresLibres} onChange={handleChange} required />
                  </>
                ) : (
                  <Campo label="Stock (ejemplares)" name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Ej. 6" required />
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
                  placeholder="Breve descripción del libro..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#1fa48a] focus:ring-1 focus:ring-[#1fa48a] resize-none"
                />
              </div>

              {(error || errorExterno) && (
                <p className="text-sm text-rose-600">{error || errorExterno}</p>
              )}
            </>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancelar
            </button>
            {mostrarCampos && (
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1fa48a] hover:bg-[#198771] cursor-pointer"
              >
                {esEdicion ? 'Guardar cambios' : 'Agregar libro'}
              </button>
            )}
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

function ModoCard({ titulo, descripcion, activo, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border px-4 py-3 transition-colors cursor-pointer ${
        activo ? 'border-[#1fa48a] bg-[#1fa48a]/5' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <p className="text-sm font-bold text-slate-900">{titulo}</p>
      <p className="text-xs text-slate-500 mt-0.5">{descripcion}</p>
    </button>
  );
}
