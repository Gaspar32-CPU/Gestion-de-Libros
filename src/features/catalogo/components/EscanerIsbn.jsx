import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { BarcodeFormat, DecodeHintType } from '@zxing/library'

// Los ISBN impresos en la contratapa son códigos EAN-13 (978/979...).
const hints = new Map([
  [DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13]],
])

export default function EscanerIsbn({ onDetectado, onCerrar }) {
  const videoRef = useRef(null)
  const [error, setError] = useState('')
  // Guardamos el callback en un ref para no reiniciar la cámara en cada render.
  const onDetectadoRef = useRef(onDetectado)
  useEffect(() => {
    onDetectadoRef.current = onDetectado
  })

  useEffect(() => {
    const reader = new BrowserMultiFormatReader(hints)
    let controls = null
    let cancelado = false

    reader
      .decodeFromConstraints(
        { video: { facingMode: 'environment' } },
        videoRef.current,
        (result, _err, ctrl) => {
          if (!result) return
          const codigo = result.getText()
          // Ignoramos códigos de barra que no son ISBN (ej. precios EAN).
          if (!/^97[89]\d{10}$/.test(codigo)) return
          ctrl.stop()
          onDetectadoRef.current(codigo)
        },
      )
      .then((ctrl) => {
        if (cancelado) ctrl.stop()
        else controls = ctrl
      })
      .catch((err) => {
        setError(
          err?.name === 'NotAllowedError'
            ? 'No diste permiso para usar la cámara.'
            : 'No se pudo acceder a la cámara. Ingresá el ISBN a mano.',
        )
      })

    return () => {
      cancelado = true
      controls?.stop()
    }
  }, [])

  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
      {error ? (
        <p className="text-sm text-rose-600">{error}</p>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-lg bg-black">
            <video
              ref={videoRef}
              muted
              playsInline
              className="w-full max-h-72 object-cover"
            />
            <div className="pointer-events-none absolute inset-x-6 top-1/2 h-0.5 -translate-y-1/2 bg-[#1fa48a]/80" />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Apuntá al código de barras de la contratapa.
          </p>
        </>
      )}
      <button
        type="button"
        onClick={onCerrar}
        className="mt-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
      >
        Cancelar
      </button>
    </div>
  )
}
