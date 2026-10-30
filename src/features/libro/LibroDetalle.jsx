// src/features/libro/LibroDetalle.jsx
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowBack, Block } from '@mui/icons-material'
import { esColorPortada } from '../../utils/portada'
import {
  obtenerLibroPorId,
  crearResena,
  obtenerResenas,
} from '../catalogo/catalogoService'
import { useAuth } from '../../context/useAuth'
import api from '../../services/api'
import { obtenerIniciales } from '../../utils/obtenerIniciales'

export const LibroDetalle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [libro, setLibro] = useState(null)
  const [idCargado, setIdCargado] = useState(null)
  const { usuario } = useAuth()
  const [resenas, setResenas] = useState([])
  const [enviando, setEnviando] = useState(null)

  const [nuevoComentario, setNuevoComentario] = useState('')
  const [estrellasSeleccionadas, setEstrellasSeleccionadas] = useState(0)

  useEffect(() => {
    let cancelado = false

    obtenerLibroPorId(id)
      .then((data) => {
        if (!cancelado) {
          setLibro(data)
          setIdCargado(id)
        }
      })
      .catch((err) => {
        console.error('Error al traer el libro', err)
        if (!cancelado) {
          setLibro(null)
          setIdCargado(id)
        }
      })

    return () => {
      cancelado = true
    }
  }, [id])

  useEffect(() => {
    obtenerResenas(id)
      .then(setResenas)
      .catch((err) => console.error('Error al traer las reseñas.', err))
  }, [id])

  const cargando = idCargado !== id

  if (cargando) {
    return <div className="p-8 text-center text-slate-500">Cargando...</div>
  }

  if (!libro) {
    return (
      <div className="p-8 text-center text-slate-500">
        No se encontró la información del libro.
      </div>
    )
  }

  const renderEstrellas = (nota) => {
    const redondeado = Math.round(nota)
    return '★'.repeat(redondeado) + '☆'.repeat(5 - redondeado)
  }

  const handleAgregarResena = async (e) => {
    e.preventDefault()

    if (!nuevoComentario.trim() || estrellasSeleccionadas === 0) return

    setError('')
    setEnviando(true)
    try {
      const nueva = await crearResena(id, {
        calificacion: estrellasSeleccionadas,
        comentario: nuevoComentario.trim(),
      })
      setResenas((prev) => [nueva, ...prev])
      setNuevoComentario('')
      setEstrellasSeleccionadas(0)
    } catch (err) {
      console.error('Error al crear la reseña', err)
      setError(err.response?.data?.mensaje || 'No se pudo crear la reseña.')
    } finally {
      setEnviando(false)
    }
  }

  const esDisponible = libro.ejemplaresLibres > 0
  // Solicitar un préstamo es una acción de lector: un admin/invitado puede
  // ver la ficha (esta ruta es pública), pero no debe poder pedirlo para sí.

  const comentarioValido = nuevoComentario.trim().length >= 50 && nuevoComentario.trim().length <= 600;
  const esLector = usuario?.rol === "lector";

  const handlePrestamo = async (e) => {
    e.preventDefault()
    setError('')

    if (!esDisponible) {
      alert('No hay ejemplares disponibles para préstamo.')
      return
    }

    try {
      const res = await api.post('/prestamos', {
        libroId: libro.id,
        usuarioId: usuario.id,
      })
      navigate('/prestamo-exitoso', {
        replace: true,
        state: { prestamo: res.data, libro },
      })
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al generar el préstamo.')
    }
  }

  return (
    <div className="mx-auto max-w-5xl font-sans antialiased text-slate-950 p-4 pb-12">
      <Link
        to="/catalogo"
        className="inline-block no-underline text-[#092e40] font-semibold text-sm mb-6"
      >
        <div className="flex items-center gap-1">
          <ArrowBack sx={{ fontSize: 16 }} />
          Volver al catálogo
        </div>
      </Link>

      <div className="flex flex-col md:flex-row gap-7.5 md:gap-10">
        {/* Columna Izquierda */}
        <div className="w-full md:w-65 shrink-0">
          {esColorPortada(libro.portadaUrl) ? (
            <div
              className="w-full h-60 md:h-95 rounded-lg mb-3.75 shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
              style={{ backgroundColor: libro.portadaUrl }}
            />
          ) : (
            <img
              src={libro.portadaUrl}
              alt={`Portada de ${libro.titulo}`}
              className="w-full h-auto max-h-95 md:h-95 object-cover rounded-lg mb-3.75 shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
            />
          )}
          <div className="bg-white p-3.75 rounded-lg border border-[#e2e8f0]">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full inline-block mb-3 ${esDisponible ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}
            >
              {esDisponible ? 'Disponible' : 'No disponible'}
            </span>
            <div className="flex flex-wrap gap-1 mb-2">
              {Array.from({ length: libro.ejemplaresTotales || 0 }).map(
                (_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-5 rounded-xs ${
                      idx < libro.ejemplaresLibres
                        ? 'bg-[#1fa48a]'
                        : 'bg-[#e2e8f0]'
                    }`}
                  />
                ),
              )}
            </div>
            <p className="text-xs text-[#64748b]">
              {libro.ejemplaresLibres} de {libro.ejemplaresTotales} ejemplares
              libres
            </p>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="grow min-w-0">
          <span className="text-[#1fa48a] text-[11px] font-bold tracking-[1px] uppercase">
            {libro.generos.join(', ')}
          </span>
          <h1 className="text-[#092e40] text-3xl font-bold mt-1 mb-1.25 tracking-tight">
            {libro.titulo}
          </h1>
          <p className="text-[#64748b] text-sm mb-3.75">
            {libro.autor} · {libro.anio} · {libro.editorial}
          </p>
          <div className="flex items-center gap-2 text-sm mb-6.25">
            <span className="text-[#f59e0b] tracking-[2px]">
              {renderEstrellas(libro.puntuacion)}
            </span>
            <span className="font-bold text-[#092e40]">
              {libro.puntuacion.toFixed(1)}
            </span>
            <span className="text-[#64748b]">({resenas.length} reseñas)</span>
          </div>
          <p className="text-[#64748b] leading-relaxed text-[15px] max-w-150 mb-6.25">
            {libro.descripcion}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 border border-[#e7e5d8] rounded-xl p-5 mb-6.25">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748b] tracking-[0.5px]">
                IDIOMA
              </span>
              <span className="text-sm font-semibold text-[#092e40] break-words">
                {libro.idioma}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748b] tracking-[0.5px]">
                SNI / ISBN
              </span>
              <span className="text-sm font-semibold text-[#092e40] break-words">
                {libro.isbn}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748b] tracking-[0.5px]">
                EDITORIAL
              </span>
              <span className="text-sm font-semibold text-[#092e40] break-words">
                {libro.editorial}
              </span>
            </div>
          </div>

          {esLector && (
            <>
              <button
                disabled={!esDisponible}
                onClick={handlePrestamo}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors cursor-pointer mb-2 bg-[#1fa48a] hover:bg-[#198771] disabled:text-ink-3 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:cursor-not-allowed"
              >
                {esDisponible ? (
                  <>
                    Solicitar Préstamo
                    <ArrowBack
                      sx={{
                        fontSize: 16,
                        transform: 'rotate(180deg)',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </>
                ) : (
                  <>
                    No disponible
                    <Block sx={{ fontSize: 18, marginLeft: '0.5rem' }} />
                  </>
                )}
              </button>
              {error && (
                <p className="-mt-2 mb-4 text-[0.85rem] text-[#c0392b]">
                  {error}
                </p>
              )}
            </>
          )}
          <p className="text-xs text-[#64748b] mb-7.5">
            {libro.condicionesPrestamo}
          </p>
          <hr className="border-0 border-t border-[#e7e5d8] mb-7.5" />

          {/* Sección de entrada: Tu reseña (Colores idénticos a tu mockup) */}
          <div className="bg-[#f5f4ef] rounded-xl p-5 mb-8 border border-[#e8e7e1]">
            <h4 className="text-sm font-bold text-[#092e40] mb-1">Tu reseña</h4>
            <p className="text-xs text-slate-500 mb-4">
              Leiste este libro. Contá qué te pareció.
            </p>

            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setEstrellasSeleccionadas(num)}
                  className={`p-1 text-2xl cursor-pointer transition-colors ${
                    num <= estrellasSeleccionadas
                      ? 'text-[#f59e0b]'
                      : 'text-slate-300'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-xs text-slate-500 ml-2 font-medium">
                Elegí una calificación
              </span>
            </div>

            <form onSubmit={handleAgregarResena} className="space-y-4">
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu opinión sobre el libro aquí..."
                maxLength={600}
                className="w-full p-3 border border-[#e2e8f0] rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1fa48a] bg-white min-h-22.5 resize-none"
              />
              <button
                type="submit"
                disabled={
                  !comentarioValido ||
                  !nuevoComentario.trim() ||
                  estrellasSeleccionadas === 0 ||
                  enviando
                }
                className="min-h-10 px-5 py-2 bg-[#1fa48a] hover:bg-[#198771] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Enviar Reseña
              </button>
            </form>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* Listado de Reseñas */}
          {resenas.length !== 0 && (
            <>
              <h3 className="text-[#092e40] text-lg font-bold mb-5">Reseñas</h3>
              <div className="space-y-5">
                {resenas.map((resena) => (
                  <div key={resena.id} className="flex gap-3.75">
                    <div className="w-8.75 h-8.75 bg-[#84cc16] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {obtenerIniciales(resena.usuario)}
                    </div>
                    <div className="grow min-w-0">
                      <p className="text-sm font-semibold text-[#092e40] flex flex-wrap items-center gap-1.5 break-words">
                        {resena.usuario}
                        <span className="text-[#f59e0b] text-[10px] ml-1 tracking-[1px]">
                          {renderEstrellas(resena.calificacion)}
                        </span>
                      </p>
                      <p className="text-sm text-[#64748b] mt-0.75 break-words">
                        {resena.comentario}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
