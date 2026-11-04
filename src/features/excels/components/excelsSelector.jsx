import { useEffect, useRef, useState } from 'react'
import {
  cancelarImportacion,
  confirmarImportacion,
  importacionActiva,
  obtenerImportacion,
  olvidarImportacion,
  recordarImportacion,
  subirExcel,
} from '../excelsService'

const INTERVALO_CONSULTA_MS = 2000

const NOMBRES_DE_CAMPO = {
  titulo: 'título',
  autor: 'autor',
  generos: 'géneros',
  editorial: 'editorial',
  stock: 'stock',
  idioma: 'idioma',
  fecha_pub: 'fecha de publicación',
}

function textoDelMotivo({ error, detalle }) {
  switch (error) {
    case 'faltan_campos':
      return `Faltan datos: ${detalle
        .split(', ')
        .map((campo) => NOMBRES_DE_CAMPO[campo] ?? campo)
        .join(', ')}`
    case 'sin_isbn_para_completar':
      return 'No tiene ISBN para completar los datos'
    case 'isbn_invalido':
      return `ISBN inválido (${detalle})`
    case 'isbn_no_encontrado':
      return 'No se encontraron datos para ese ISBN'
    case 'isbn_consulta_fallida':
      return 'No se pudo consultar el ISBN'
    case 'fecha_invalida':
      return `Fecha de publicación inválida (${detalle})`
    case 'libro_existente':
      return 'Ya existe un libro con ese ISBN'
    case 'codigo_interno_duplicado':
      return `Código interno repetido (${detalle})`
    case 'codigo_interno_invalido':
      return 'El código interno es demasiado largo'
    case 'campo_demasiado_largo':
      return `Texto demasiado largo en: ${detalle
        .split(', ')
        .map((campo) => NOMBRES_DE_CAMPO[campo] ?? campo)
        .join(', ')}`
    default:
      return error
  }
}

// El back manda un mensaje legible en la mayoría de los errores; si no vino
// nada usable, mostramos algo genérico en vez de romper.
function mensajeDeError(err, fallback) {
  return err.response?.data?.mensaje || fallback
}

export default function ExcelsSelector({ onImportado }) {
  const inputRef = useRef(null)
  const [archivo, setArchivo] = useState(null)
  const [importacion, setImportacion] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [confirmando, setConfirmando] = useState(false)
  const [error, setError] = useState('')

  const importacionId = importacion?.id
  const estado = importacion?.estado

  // Si el usuario se fue y volvió (o recargó), retomamos la importación en curso
  useEffect(() => {
    const id = importacionActiva()
    if (!id) return

    obtenerImportacion(id)
      .then((datos) => setImportacion({ id, ...datos }))
      .catch(olvidarImportacion) // venció o el servidor se reinició
  }, [])

  // Mientras el back valida el archivo, consultamos el avance cada tanto
  useEffect(() => {
    if (!importacionId || estado !== 'procesando') return

    const intervalo = setInterval(async () => {
      try {
        const datos = await obtenerImportacion(importacionId)
        setImportacion((prev) => ({ ...prev, ...datos }))
      } catch (err) {
        clearInterval(intervalo)
        olvidarImportacion()
        setError(
          mensajeDeError(
            err,
            'No se pudo consultar el avance. Intentá de nuevo.',
          ),
        )
        setImportacion(null)
      }
    }, INTERVALO_CONSULTA_MS)

    return () => clearInterval(intervalo)
  }, [importacionId, estado])

  const reiniciar = () => {
    olvidarImportacion()
    setArchivo(null)
    setImportacion(null)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleSubir = async () => {
    setError('')
    setSubiendo(true)
    try {
      const { id, total } = await subirExcel(archivo)
      recordarImportacion(id)
      setImportacion({ id, estado: 'procesando', procesados: 0, total })
    } catch (err) {
      setError(
        mensajeDeError(err, 'No se pudo subir el archivo. Intentá de nuevo.'),
      )
    } finally {
      setSubiendo(false)
    }
  }

  // Avisa al back para que corte la validación y vuelve al formulario. Si la
  // importación ya no existe (venció) da igual: el resultado es el mismo.
  const handleCancelar = async () => {
    try {
      await cancelarImportacion(importacionId)
    } catch (err) {
      if (err.response?.status !== 404) {
        setError(
          mensajeDeError(
            err,
            'No se pudo cancelar la importación. Intentá de nuevo.',
          ),
        )
        return
      }
    }
    reiniciar()
  }

  const handleConfirmar = async () => {
    setError('')
    setConfirmando(true)
    try {
      const { insertados } = await confirmarImportacion(importacionId)
      olvidarImportacion()
      setImportacion((prev) => ({ ...prev, estado: 'insertado', insertados }))
      onImportado?.()
    } catch (err) {
      setError(
        mensajeDeError(
          err,
          'No se pudieron guardar los libros. Intentá de nuevo.',
        ),
      )
    } finally {
      setConfirmando(false)
    }
  }

  const porcentaje = importacion?.total
    ? Math.round((importacion.procesados / importacion.total) * 100)
    : 0

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-6">
      {!importacion && (
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-1">
            <label
              htmlFor="excel-libros"
              className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
            >
              Excel de libros (.xlsx)
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-1.5">
              <label
                htmlFor="excel-libros"
                className={`text-sm truncate cursor-pointer ${
                  archivo
                    ? 'text-slate-800 font-medium'
                    : 'text-slate-400 italic'
                }`}
              >
                {archivo ? archivo.name : 'Ningún archivo seleccionado'}
              </label>

              <input
                id="excel-libros"
                ref={inputRef}
                type="file"
                accept=".xlsx"
                onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubir}
            disabled={!archivo || subiendo}
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1fa48a] hover:bg-[#198771] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {subiendo ? 'Subiendo...' : 'Validar archivo'}
          </button>
        </div>
      )}

      {estado === 'procesando' && (
        <div>
          <p className="text-sm text-slate-700 mb-2">
            Validando libros: {importacion.procesados} de {importacion.total}
          </p>
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-[#1fa48a] transition-all"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Si faltan datos, los buscamos por ISBN. Puede tardar unos minutos;
            podés dejar esta pantalla abierta.
          </p>
          <button
            type="button"
            onClick={handleCancelar}
            className="mt-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
          >
            Cancelar importación
          </button>
        </div>
      )}

      {(estado === 'listo' || estado === 'insertando') && (
        <div>
          <p className="text-sm font-semibold text-slate-800">
            {importacion.listos.length} libros listos para cargar ·{' '}
            {importacion.rechazados.length} rechazados
          </p>

          {importacion.rechazados.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-slate-600">
                Ver rechazados
              </summary>
              <ul className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-slate-200 bg-white divide-y divide-slate-100 text-sm">
                {importacion.rechazados.map((rechazado) => (
                  <li key={rechazado.fila} className="px-3 py-2">
                    <span className="font-medium text-slate-800">
                      Fila {rechazado.fila}
                      {rechazado.titulo ? `: ${rechazado.titulo}` : ''}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {rechazado.problemas.map(textoDelMotivo).join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {importacion.listos.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-slate-600">
                Ver libros que se van a cargar
              </summary>
              <ul className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-slate-200 bg-white divide-y divide-slate-100 text-sm">
                {importacion.listos.map((libro) => (
                  <li key={libro.fila} className="px-3 py-2">
                    <span className="font-medium text-slate-800">
                      {libro.titulo}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {libro.autor} · código {libro.codigoInterno}
                      {libro.origen === 'isbn'
                        ? ' · datos completados por ISBN'
                        : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleConfirmar}
              disabled={
                importacion.listos.length === 0 ||
                confirmando ||
                estado === 'insertando'
              }
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1fa48a] hover:bg-[#198771] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {confirmando
                ? 'Guardando...'
                : `Importar ${importacion.listos.length} libros`}
            </button>
            <button
              type="button"
              onClick={handleCancelar}
              disabled={confirmando}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {estado === 'insertado' && (
        <div>
          <p className="text-sm font-semibold text-[#198771]">
            Se importaron {importacion.insertados} libros al catálogo.
          </p>
          <button
            type="button"
            onClick={reiniciar}
            className="mt-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
          >
            Importar otro archivo
          </button>
        </div>
      )}

      {estado === 'error' && (
        <div>
          <p className="text-sm text-red-600">
            {importacion.mensaje || 'La importación falló.'}
          </p>
          <button
            type="button"
            onClick={reiniciar}
            className="mt-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
          >
            Probar de nuevo
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  )
}
