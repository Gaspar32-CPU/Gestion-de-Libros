import { Delete, Upload } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { obtenerIniciales } from '../../../utils/obtenerIniciales'

const MAX_SIZE_MB = 2
const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']

const getInitial = (name = '') => name.trim().charAt(0).toUpperCase() || '?'

export default function LogoUploader({
  configuracion,
  value = null,
  onUpload,
  onDelete,
}) {
  const inputRef = useRef(null)
  const [logo, setLogo] = useState(value)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => setLogo(value), [value])

  useEffect(() => {
    return () => {
      if (logo?.startsWith('blob:')) URL.revokeObjectURL(logo)
    }
  }, [logo])

  const openPicker = () => inputRef.current?.click()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    // Validaciones
    if (!ACCEPTED.includes(file.type)) {
      setError('Formato no válido. Usa PNG, JPG, WEBP o SVG.')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`El archivo supera los ${MAX_SIZE_MB} MB.`)
      return
    }

    setError('')
    const previous = logo
    const preview = URL.createObjectURL(file)
    setLogo(preview)
    setLoading(true)

    try {
      const finalUrl = await onUpload?.(file)
      setLogo(finalUrl || preview)
    } catch {
      setLogo(previous)
      setError('No se pudo subir el logo. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!logo || loading) return
    const previous = logo
    setLoading(true)
    setError('')
    try {
      await onDelete?.()
      setLogo(null)
    } catch {
      setLogo(previous)
      setError('No se pudo eliminar el logo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-slate-800">Logo</p>

      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl text-xl font-bold text-white"
          style={{ background: '#1fa58a', opacity: loading ? 0.6 : 1 }}
        >
          {logo ? (
            <img src={logo} alt="Logo" className="h-full w-full object-cover" />
          ) : (
            obtenerIniciales(configuracion?.nombre || 'Biblioteca')
          )}
        </div>

        <button
          type="button"
          onClick={openPicker}
          disabled={loading}
          aria-label="Subir logo"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 cursor-pointer hover:bg-slate-50 disabled:opacity-50"
        >
          <Upload size={18} />
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={!logo || loading}
          aria-label="Eliminar logo"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Delete size={18} />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(',')}
          onChange={handleFile}
          hidden
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
