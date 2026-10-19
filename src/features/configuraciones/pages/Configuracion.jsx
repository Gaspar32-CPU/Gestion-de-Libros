import { useEffect, useMemo, useState } from 'react'
import { coloresPrimarios, coloresSecundarios } from '../data/colores'
import { useAuth } from '../../../context/useAuth'
import { obtenerMiConfiguracion } from '../configuracionService'
import LogoUploader from '../components/LogoUploader'
import ColoresPicker from '../components/ColoresPicker'

export function Configuracion() {
  const { usuario } = useAuth()
  const [configuracion, setConfiguracion] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // useEffect(() => {
  // obtenerMiConfiguracion(usuario.id)
  //     .then((config) => {
  //     setconfiguracion(config);
  //     setCargando(false);
  //     })
  //     .catch((error) => {
  //     setError(error.message || "Error al obtener la configuración");
  //     setCargando(false);
  //     });
  // }, []);

  // if (cargando) {
  //   return (
  //       <div className="p-8 text-center">
  //       <p className="text-gray-500">Cargando configuración...</p>
  //       </div>
  //   );
  // }

  //   if (error && configuracion.length === 0) {
  //     return (
  //       <div className="p-4 md:p-8">
  //         <div className="rounded-xl border border-red-200 bg-white p-5">
  //           <p className="text-red-600">{error}</p>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="p-4 md:p-8 max-w-3xl color-ink">
      <div className="flex-1 mb-7 mx-auto items-end justify-between">
        <div className="pb-5">
          <h1 className="text-3xl font-bold tracking-tight text-[#152943]">
            Configuración
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Reglas de préstamo, notificaciones e identidad visual.
          </p>
        </div>
        <div className="flex flex-col gap-5 bg-white rounded-lg shadow p-4">
          <div>
            <p className="font-bold text-[#152943]">Identidad visual</p>
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
          <div>
            <p className="text-sm font-semibold py-4 text-slate-800">
              Reglas de préstamo
            </p>

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
