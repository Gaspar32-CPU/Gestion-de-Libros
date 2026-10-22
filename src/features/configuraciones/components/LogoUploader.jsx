import { Delete, Upload } from '@mui/icons-material'
import { useRef, useState } from 'react'
import { obtenerIniciales } from '../../../utils/obtenerIniciales'
import { urlArchivo } from '../../../utils/urlArchivo'

const MAX_SIZE_MB = 2

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp']

export default function LogoUploader({
  configuracion,
  value = null,
  onSelect,
  onRemove,
}) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')

  const openPicker = () => inputRef.current?.click()

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    // Validaciones
    if (!ACCEPTED.includes(file.type)) {
      setError('Formato no válido. Usa PNG, JPG o WEBP.')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`El archivo supera los ${MAX_SIZE_MB} MB.`)
      return
    }

    setError('')
    onSelect(file)
  }

  const handleDelete = () => {
    setError('')
    onRemove()
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-slate-800">Logo</p>

      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl text-xl font-bold text-white"
          style={{ background: '#1fa58a' }}
        >
          {value ? (
            <img src={urlArchivo(value)} alt="Logo" className="h-full w-full object-cover" />
          ) : (
            obtenerIniciales(configuracion?.nombreApp || 'Biblioteca')
          )}
        </div>

        <button
          type="button"
          onClick={openPicker}
          aria-label="Subir logo"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 cursor-pointer hover:bg-slate-50 disabled:opacity-50"
        >
          <Upload size={18} />
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={!value}
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
