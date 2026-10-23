import { useEffect, useState } from 'react'
import {
  AddRounded,
  EditOutlined,
  DeleteOutlineOutlined,
} from '@mui/icons-material'
import LibroFormModal from '../components/LibroFormModal'
import { esColorPortada } from '../../../utils/portada'
import {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} from '../catalogoService'

// El back manda un mensaje legible en la mayoría de los errores (400, 404, 409);
// si no vino nada usable, mostramos algo genérico en vez de romper.
function mensajeDeError(err, fallback) {
  return err.response?.data?.mensaje || fallback
}

export default function GestionCatalogo() {
  const [libros, setLibros] = useState([])
  const [libroEnEdicion, setLibroEnEdicion] = useState(null) // null = cerrado, {} = crear, libro = editar
  const [libroAEliminar, setLibroAEliminar] = useState(null)
  const [errorGuardado, setErrorGuardado] = useState('')
  const [errorEliminar, setErrorEliminar] = useState('')

  useEffect(() => {
    obtenerLibros()
      .then(setLibros)
      .catch((err) => console.error('Error al traer el catálogo', err))
  }, [])

  const handleGuardar = async (datos) => {
    setErrorGuardado('')
    try {
      if (datos.id) {
        const libroActualizado = await actualizarLibro(datos.id, datos)
        setLibros((prev) =>
          prev.map((libro) =>
            libro.id === datos.id ? libroActualizado : libro,
          ),
        )
      } else {
        const libroCreado = await crearLibro(datos)
        setLibros((prev) => [...prev, libroCreado])
      }
      setLibroEnEdicion(null)
    } catch (err) {
      console.error('Error al guardar el libro', err)
      setErrorGuardado(
        mensajeDeError(err, 'No se pudo guardar el libro. Intentá de nuevo.'),
      )
    }
  }

  const handleEliminar = async () => {
    setErrorEliminar('')
    try {
      await eliminarLibro(libroAEliminar.id)
      setLibros((prev) =>
        prev.filter((libro) => libro.id !== libroAEliminar.id),
      )
      setLibroAEliminar(null)
    } catch (err) {
      console.error('Error al eliminar el libro', err)
      setErrorEliminar(
        mensajeDeError(err, 'No se pudo eliminar el libro. Intentá de nuevo.'),
      )
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Gestión de catálogo
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {libros.length} libros en el catálogo
          </p>
        </div>
        <button
          onClick={() => setLibroEnEdicion({})}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1fa48a] hover:bg-[#198771] transition-colors cursor-pointer"
        >
          <AddRounded fontSize="small" />
          Crear libro
        </button>
      </div>

      <div className="md:bg-white md:rounded-xl md:border md:border-slate-200 md:shadow-sm md:overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm block md:table">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-slate-200 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-3">Libro</th>
                <th className="px-4 py-3">Género</th>
                <th className="px-4 py-3">Ejemplares</th>
                <th className="px-4 py-3">Puntuación</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {libros.map((libro) => (
                <tr
                  key={libro.id}
                  className="block mb-3 p-4 rounded-xl border border-slate-200 bg-white md:mb-0 md:p-0 md:table-row md:rounded-none md:border-0 md:border-b md:border-slate-100 md:last:border-0 md:bg-transparent hover:bg-slate-50"
                >
                  <td className="block px-0 mb-3 md:mb-0 md:table-cell md:px-4 md:py-3 before:content-none">
                    <div className="flex items-center gap-3">
                      {esColorPortada(libro.portadaUrl) || !libro.portadaUrl ? (
                        <div
                          className="w-10 h-14 rounded shrink-0"
                          style={{
                            backgroundColor: esColorPortada(libro.portadaUrl)
                              ? libro.portadaUrl
                              : '#1fa48a',
                          }}
                        />
                      ) : (
                        <img
                          src={libro.portadaUrl}
                          alt={`Portada de ${libro.titulo}`}
                          className="w-10 h-14 object-cover rounded shrink-0 bg-slate-100"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {libro.titulo}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {libro.autor}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    data-label="Género"
                    className="flex justify-between gap-3 px-0 py-1.5 text-slate-600 whitespace-nowrap md:table-cell md:px-4 md:py-3 before:content-[attr(data-label)] before:text-xs before:font-semibold before:uppercase before:text-slate-400 md:before:content-none"
                  >
                    {libro.genero}
                  </td>
                  <td
                    data-label="Ejemplares"
                    className="flex justify-between gap-3 px-0 py-1.5 text-slate-600 whitespace-nowrap md:table-cell md:px-4 md:py-3 before:content-[attr(data-label)] before:text-xs before:font-semibold before:uppercase before:text-slate-400 md:before:content-none"
                  >
                    {libro.ejemplaresLibres} / {libro.ejemplaresTotales}
                  </td>
                  <td
                    data-label="Puntuación"
                    className="flex justify-between gap-3 px-0 py-1.5 text-slate-600 whitespace-nowrap md:table-cell md:px-4 md:py-3 before:content-[attr(data-label)] before:text-xs before:font-semibold before:uppercase before:text-slate-400 md:before:content-none"
                  >
                    ★ {libro.puntuacion.toFixed(1)}
                  </td>
                  <td className="block px-0 pt-2 md:table-cell md:px-4 md:py-3 before:content-none">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setLibroEnEdicion(libro)}
                        aria-label={`Editar ${libro.titulo}`}
                        className="p-2.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                      >
                        <EditOutlined fontSize="small" />
                      </button>
                      <button
                        onClick={() => {
                          setErrorEliminar('')
                          setLibroAEliminar(libro)
                        }}
                        aria-label={`Eliminar ${libro.titulo}`}
                        className="p-2.5 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                      >
                        <DeleteOutlineOutlined fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {libroEnEdicion !== null && (
        <LibroFormModal
          libro={libroEnEdicion}
          onGuardar={handleGuardar}
          onCerrar={() => setLibroEnEdicion(null)}
          errorExterno={errorGuardado}
        />
      )}

      {libroAEliminar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setLibroAEliminar(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Eliminar libro
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              ¿Seguro que querés eliminar{' '}
              <strong>{libroAEliminar.titulo}</strong> del catálogo? Esta acción
              no se puede deshacer.
            </p>
            {errorEliminar && (
              <p className="text-sm text-rose-600 mb-4 -mt-2">
                {errorEliminar}
              </p>
            )}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setLibroAEliminar(null)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
