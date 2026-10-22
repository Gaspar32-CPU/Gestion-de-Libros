import { useEffect, useState } from 'react'
import { coloresPrimarios, coloresSecundarios } from '../data/colores'
import { useAuth } from '../../../context/useAuth'
import LogoUploader from '../components/LogoUploader'
import ColoresPicker from '../components/ColoresPicker'
import ReglasPrestamos from './ReglasPrestamos'
import WeeklySchedule from '../components/WeeklySchedule'
import PlantillaNotificacion from '../components/PlantillaNotificacion'
import { TIPOS_MENSAJE } from '../data/mensajes'
import {
  editarMiConfiguracion,
  obtenerMiConfiguracion,
  quitarLogo,
  subirLogo,
} from '../configuracionService'

export function Configuracion() {
  const { usuario } = useAuth()
  // "original" es lo último guardado en la DB; "configuracion" lo que se está
  // editando. Si son distintos, hay cambios sin guardar.
  const [original, setOriginal] = useState(null)
  const [configuracion, setConfiguracion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerMiConfiguracion(usuario.organizacionId)
      .then((config) => {
        setOriginal(config)
        setConfiguracion(config)
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ||
            err.message ||
            'Error al obtener la configuración',
        )
      })
      .finally(() => setCargando(false))
  }, [usuario.organizacionId])

  const hayCambios = JSON.stringify(configuracion) !== JSON.stringify(original)

  // Funcional para que dos cambios seguidos (ej: activar el congelamiento y
  // setear sus días) no se pisen entre sí.
  const cambiar = (campo, valor) => {
    setConfiguracion((actual) => ({ ...actual, [campo]: valor }))
  }

  const cambiarMensaje = (mensajeEditado) => {
    setConfiguracion((actual) => ({
      ...actual,
      mensajesPersonalizados: actual.mensajesPersonalizados.map((m) =>
        m.tipo === mensajeEditado.tipo ? mensajeEditado : m,
      ),
    }))
  }

  const [archivoLogo, setArchivoLogo] = useState(null)

  if (cargando) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Cargando configuración...</p>
      </div>
    )
  }

  if (!configuracion) {
    return (
      <div className="p-4 md:p-8">
        <div className="rounded-xl border border-red-200 bg-white p-5">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  const faltanObligatorios =
    !configuracion.nombreApp.trim() || !configuracion.lugarRetiro.trim()

  const cambiarLogo = (archivo) => {
    if (configuracion.logo?.startsWith('blob:')) {
      URL.revokeObjectURL(configuracion.logo)
    }
    setArchivoLogo(archivo)
    cambiar('logo', archivo ? URL.createObjectURL(archivo) : null)
  }

  // El logo tiene sus propios endpoints (el PUT lo ignora).
  const guardarLogo = async () => {
    if (configuracion.logo === original.logo) return
    if (archivoLogo) {
      await subirLogo(usuario.organizacionId, archivoLogo)
    } else {
      await quitarLogo(usuario.organizacionId)
    }
  }

  const guardar = async () => {
    setGuardando(true)
    setError('')
    try {
      await guardarLogo()
      await editarMiConfiguracion(usuario.organizacionId, configuracion)
      // Se recarga para que el resto de la app (sidebar, header, colores)
      // tome los valores nuevos, que se leen al cargar cada layout.
      window.location.reload()
    } catch (err) {
      setError(
        err.response?.data?.mensaje ||
          err.response?.data?.error ||
          'No se pudo guardar la configuración',
      )
      // Solo en error: si salió bien, el botón queda en "Guardando..." hasta
      // que termina la recarga.
      setGuardando(false)
    }
  }

  const descartar = () => {
    if (configuracion.logo?.startsWith('blob:')) {
      URL.revokeObjectURL(configuracion.logo)
    }
    setArchivoLogo(null)
    setConfiguracion(original)
    setError('')
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl color-ink">
      <div className="flex-1 mb-7 mx-auto items-end justify-between">
        <div className="pb-5">
          <h1 className="text-3xl font-bold tracking-tight text-ink">
            Configuración
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Reglas de préstamo, notificaciones e identidad visual.
          </p>
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-lg shadow p-4 mb-6 border border-gray-300">
          <div>
            <p className="font-bold text-ink">Identidad visual</p>
            <p className="mt-1 text-sm text-gray-500">
              Se aplica en todo el sistema
            </p>
          </div>
          <div className="flex items-start gap-4">
            <LogoUploader
              configuracion={configuracion}
              value={configuracion.logo}
              onSelect={cambiarLogo}
              onRemove={() => cambiarLogo(null)}
            />
            <div>
              <p className="text-sm font-semibold pb-2 text-slate-800">
                Nombre de la app
              </p>
              <input
                type="text"
                value={configuracion.nombreApp}
                placeholder="Nombre de la app"
                maxLength={150}
                onChange={(e) => cambiar('nombreApp', e.target.value)}
                className="mt-1 block w-full h-10 p-3 rounded-lg border border-gray-300 shadow-sm outline-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <ColoresPicker
            coloresPrimarios={Object.values(coloresPrimarios)}
            coloresSecundarios={Object.values(coloresSecundarios)}
            primario={configuracion.colorPrimario}
            secundario={configuracion.colorSecundario}
            onChangePrimario={(color) => cambiar('colorPrimario', color)}
            onChangeSecundario={(color) => cambiar('colorSecundario', color)}
          />
          <ReglasPrestamos configuracion={configuracion} onChange={cambiar} />
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-lg shadow p-4 mb-6 border border-gray-300">
          <div>
            <p className="font-bold text-ink">Días y horarios de atención</p>
            <p className="mt-1 text-sm text-gray-500">
              Determinan cuándo se pueden retirar y devolver libros.
            </p>
          </div>
          <div>
            <WeeklySchedule />
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex gap-10">
                <div className="flex-1">
                  <p className="text-ink-3 text-sm font-bold">
                    Lugar de retiro
                  </p>
                  <input
                    type="text"
                    value={configuracion.lugarRetiro}
                    placeholder="Lugar de retiro."
                    maxLength={150}
                    onChange={(e) => cambiar('lugarRetiro', e.target.value)}
                    className="mt-1 block w-full h-10 p-3 rounded-lg border border-gray-300 shadow-sm outline-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-ink-3 text-sm font-bold">
                    Lugar de devolución
                  </p>
                  <input
                    type="text"
                    value={configuracion.lugarDevolucion}
                    placeholder="Lugar de devolución."
                    maxLength={150}
                    onChange={(e) => cambiar('lugarDevolucion', e.target.value)}
                    className="mt-1 block w-full h-10 p-3 rounded-lg border border-gray-300 shadow-sm outline-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Se muestra al lector al confirmar el préstamo ambos lugares.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-lg shadow p-4 mb-6 border border-gray-300">
          <div>
            <p className="font-bold text-ink">Plantillas de notificación</p>
            <p className="mt-1 text-sm text-gray-500">
              Cada aviso que reciben los lectores. Insertá datos que se completan solos con los botones debajo de cada mensaje.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {configuracion.mensajesPersonalizados.map((mensaje) => (
              <PlantillaNotificacion
                key={mensaje.tipo}
                titulo={
                  TIPOS_MENSAJE.find((t) => t.tipo === mensaje.tipo)?.titulo
                }
                mensaje={mensaje}
                onChange={cambiarMensaje}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-col gap-3 border-t border-gray-300 bg-white/95 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : hayCambios && faltanObligatorios ? (
            <p className="text-gray-500">
              El nombre de la app y el lugar de retiro son obligatorios.
            </p>
          ) : hayCambios ? (
            <p className="text-gray-500">Tenés cambios sin guardar.</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={descartar}
            disabled={!hayCambios || guardando}
            className="cursor-pointer rounded-[10px] border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Descartar
          </button>
          <button
            type="button"
            onClick={guardar}
            disabled={!hayCambios || faltanObligatorios || guardando}
            className="cursor-pointer rounded-[10px] border-none bg-[#14877a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f5c53] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
