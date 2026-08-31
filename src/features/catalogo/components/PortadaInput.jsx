import { useState } from 'react';
import { esColorPortada } from '../../../utils/portada';

const COLOR_POR_DEFECTO = '#1fa48a';

const COLORES_PRESET = [
  '#1fa48a',
  '#b45309',
  '#ea580c',
  '#2563eb',
  '#7c3aed',
  '#059669',
  '#be123c',
  '#0f766e',
];

const OPCIONES = [
  { valor: 'color', label: 'Color' },
  { valor: 'url', label: 'Desde URL' },
  { valor: 'archivo', label: 'Subir imagen' },
];

// Sin tope, un archivo de varios MB se convierte a base64 (~33% más pesado
// todavía) y viaja entero como campo de texto en el alta/edición del libro.
const TAMANIO_MAXIMO_MB = 2;

export default function PortadaInput({ value, onChange, titulo }) {
  const [modo, setModo] = useState(() => (esColorPortada(value) || !value ? 'color' : 'url'));
  const [errorArchivo, setErrorArchivo] = useState('');

  const handleArchivo = (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    if (archivo.size > TAMANIO_MAXIMO_MB * 1024 * 1024) {
      setErrorArchivo(`La imagen no puede pesar más de ${TAMANIO_MAXIMO_MB}MB.`);
      e.target.value = '';
      return;
    }

    setErrorArchivo('');
    const lector = new FileReader();
    lector.onload = () => onChange(lector.result);
    lector.readAsDataURL(archivo);
  };

  const handleModoChange = (nuevoModo) => {
    setModo(nuevoModo);
    // El input de color nativo solo dispara onChange cuando el usuario elige un
    // color; si no, el valor por defecto que se ve nunca llega al formulario.
    if (nuevoModo === 'color' && !esColorPortada(value)) {
      onChange(COLOR_POR_DEFECTO);
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        Portada
      </label>

      <div className="flex items-start gap-4">
        <div
          className="relative w-24 h-32 shrink-0 rounded-xl overflow-hidden shadow-sm bg-cover bg-center"
          style={
            value
              ? esColorPortada(value)
                ? { backgroundColor: value }
                : { backgroundImage: `url(${value})` }
              : { backgroundColor: COLOR_POR_DEFECTO }
          }
        >
          <div className="absolute inset-0 bg-black/10" />
          <p className="absolute bottom-2 left-2 right-2 text-xs font-semibold text-white leading-tight">
            {titulo?.trim() || 'Título del libro'}
          </p>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex gap-1 mb-2 bg-slate-100 rounded-lg p-1 w-fit">
            {OPCIONES.map((opcion) => (
              <button
                key={opcion.valor}
                type="button"
                onClick={() => handleModoChange(opcion.valor)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                  modo === opcion.valor
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {opcion.label}
              </button>
            ))}
          </div>

          {modo === 'url' && (
            <input
              type="text"
              value={esColorPortada(value) ? '' : (value ?? '')}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#1fa48a] focus:ring-1 focus:ring-[#1fa48a]"
            />
          )}

          {modo === 'archivo' && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleArchivo}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:cursor-pointer cursor-pointer"
              />
              {errorArchivo && <p className="text-xs text-rose-600 mt-2">{errorArchivo}</p>}
            </div>
          )}

          {modo === 'color' && (
            <div>
              <div className="flex gap-2">
                {COLORES_PRESET.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => onChange(color)}
                    aria-label={`Color ${color}`}
                    className={`w-8 h-8 rounded-md border-2 cursor-pointer transition-transform ${
                      value === color ? 'border-slate-900 scale-105' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Se asigna un color identificatorio en lugar de una portada.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
