import { useState } from 'react';
import { esColorPortada } from '../../../utils/portada';

const COLOR_POR_DEFECTO = '#1fa48a';

const OPCIONES = [
  { valor: 'url', label: 'Pegar URL' },
  { valor: 'archivo', label: 'Subir imagen' },
  { valor: 'color', label: 'Color' },
];

export default function PortadaInput({ value, onChange }) {
  const [modo, setModo] = useState(() => (esColorPortada(value) ? 'color' : 'url'));

  const handleArchivo = (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

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
        <input
          type="file"
          accept="image/*"
          onChange={handleArchivo}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:cursor-pointer cursor-pointer"
        />
      )}

      {modo === 'color' && (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={esColorPortada(value) ? value : COLOR_POR_DEFECTO}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-14 rounded-lg border border-slate-200 cursor-pointer"
          />
          <span className="text-sm text-slate-500">
            Se usa como portada lisa cuando no hay una imagen real.
          </span>
        </div>
      )}

      {value && (
        <div className="mt-2 flex items-center gap-2">
          <div
            className="w-10 h-14 rounded shrink-0 bg-slate-100 bg-cover bg-center"
            style={
              esColorPortada(value)
                ? { backgroundColor: value }
                : { backgroundImage: `url(${value})` }
            }
          />
          <span className="text-xs text-slate-400">Vista previa</span>
        </div>
      )}
    </div>
  );
}
