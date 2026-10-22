import { useEffect, useMemo, useState } from 'react'
import { coloresPrimarios, coloresSecundarios } from '../data/colores'
import { useAuth } from '../../../context/useAuth'
import LogoUploader from '../components/LogoUploader'
import ColoresPicker from '../components/ColoresPicker'
import ReglasPrestamos from './ReglasPrestamos'
import WeeklySchedule from '../components/WeeklySchedule'
import PlantillaNotificacion from '../components/PlantillaNotificacion'
import { TIPOS_MENSAJE, completarMensajes } from '../data/mensajes'
import { obtenerMiConfiguracion } from '../configuracionService'

export function Configuracion() {
  const { usuario } = useAuth()
  const [configuracion, setConfiguracion] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const mensajesPersonalizados = useMemo(
    () => completarMensajes(configuracion?.mensajes_personalizados),
    [configuracion?.mensajes_personalizados],
  )

  const cambiarMensaje = (mensajeEditado) => {
    setConfiguracion({
      ...configuracion,
      mensajes_personalizados: mensajesPersonalizados.map((m) =>
        m.tipo === mensajeEditado.tipo ? mensajeEditado : m,
      ),
    })
  }

  useEffect(() => {
  obtenerMiConfiguracion(usuario.organizacionId)
      .then((config) => {
        setConfiguracion(config);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message || "Error al obtener la configuración");
        setCargando(false);
      });
  }, [usuario.organizacionId]);

  if (cargando) {
    return (
        <div className="p-8 text-center">
        <p className="text-gray-500">Cargando configuración...</p>
        </div>
    );
  }

    if (error && configuracion.length === 0) {
      return (
        <div className="p-4 md:p-8">
          <div className="rounded-xl border border-red-200 bg-white p-5">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      );
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
              value={configuracion?.logo}
              onUpload={async (file) => {
                const body = new FormData()
                body.append('logo', file)
                const res = await fetch('/api/company/logo', {
                  method: 'POST',
                  body,
                })
                if (!res.ok) throw new Error()
                return (await res.json()).url
              }}
              onDelete={async () => {
                const res = await fetch('/api/company/logo', {
                  method: 'DELETE',
                })
                if (!res.ok) throw new Error()
              }}
            />
            <div>
              <p className="text-sm font-semibold pb-2 text-slate-800">
                Nombre de la app
              </p>
              <input
                type="text"
                value={configuracion?.nombre || ''}
                placeholder="Nombre de la app"
                onChange={(e) =>
                  setConfiguracion({ ...configuracion, nombre: e.target.value })
                }
                className="mt-1 block w-full h-10 p-3 rounded-lg border border-gray-300 shadow-sm outline-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <ColoresPicker
            coloresPrimarios={Object.values(coloresPrimarios)}
            coloresSecundarios={Object.values(coloresSecundarios)}
            primario={configuracion?.color_primario}
            secundario={configuracion?.color_secundario}
            onChangePrimario={(color) =>
              setConfiguracion({ ...configuracion, color_primario: color })
            }
            onChangeSecundario={(color) =>
              setConfiguracion({ ...configuracion, color_secundario: color })
            }
          />
          <ReglasPrestamos configuracion={configuracion} />
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-lg shadow p-4 mb-6 border border-gray-300">
          <div>
            <p className="font-bold text-ink">Días y horarios de atención</p>
            <p className="mt-1 text-sm text-gray-500">
              Determinan cuándo se pueden retirar y devolver libros.
            </p>
          </div>
          <div>
            <WeeklySchedule/>
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex gap-10">
                <div className="flex-1">
                  <p className="text-ink-3 text-sm font-bold">
                    Lugar de retiro
                  </p>
                  <input
                    type="text"
                    value={configuracion?.lugar_retiro || ''}
                    placeholder="Lugar de retiro."
                    onChange={(e) =>
                      setConfiguracion({ ...configuracion, lugar_retiro: e.target.value })
                    }
                    className="mt-1 block w-full h-10 p-3 rounded-lg border border-gray-300 shadow-sm outline-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-ink-3 text-sm font-bold">
                    Lugar de devolución
                  </p>
                  <input
                    type="text"
                    value={configuracion?.lugar_devolucion || ''}
                    placeholder="Lugar de devolución."
                    onChange={(e) =>
                      setConfiguracion({ ...configuracion, lugar_devolucion: e.target.value })
                    }
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
            {mensajesPersonalizados.map((mensaje) => (
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

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}
