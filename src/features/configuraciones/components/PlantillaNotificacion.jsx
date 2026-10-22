import { useRef } from 'react'
import ToggleComponent from './ToggleComponente'
import { VARIABLES_MENSAJE } from '../data/mensajes'

export default function PlantillaNotificacion({ titulo, mensaje, onChange }) {
  const textareaRef = useRef(null)

  const insertarVariable = (clave) => {
    const textarea = textareaRef.current
    const inicio = textarea?.selectionStart ?? mensaje.mensaje.length
    const fin = textarea?.selectionEnd ?? mensaje.mensaje.length
    const texto =
      mensaje.mensaje.slice(0, inicio) + clave + mensaje.mensaje.slice(fin)

    onChange({ ...mensaje, mensaje: texto })

    requestAnimationFrame(() => {
      textarea?.focus()
      textarea?.setSelectionRange(inicio + clave.length, inicio + clave.length)
    })
  }

  return (
    <div className="flex flex-col gap-2 border-b border-gray-300 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-4">
        <ToggleComponent
          checked={mensaje.activo}
          onChange={() => onChange({ ...mensaje, activo: !mensaje.activo })}
        />
        <p className="font-semibold text-gray-700">{titulo}</p>
      </div>
      {mensaje.activo ? (
        <>
          <textarea
            ref={textareaRef}
            value={mensaje.mensaje}
            rows={3}
            onChange={(e) => onChange({ ...mensaje, mensaje: e.target.value })}
            className="block w-full p-3 rounded-lg border border-gray-300 shadow-sm outline-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <div className="flex flex-wrap gap-2">
            {VARIABLES_MENSAJE.map((variable) => (
              <button
                key={variable.clave}
                type="button"
                onClick={() => insertarVariable(variable.clave)}
                className="px-2 py-1 text-xs rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                + {variable.etiqueta}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-ink-3 text-sm font-bold">No se envía</p>
      )}
    </div>
  )
}
