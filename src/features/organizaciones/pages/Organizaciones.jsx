import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  obtenerTodasOrganizaciones,
  filtrarOrganizaciones,
} from '../organizacionesService'
import { obtenerIniciales } from '../../../utils/obtenerIniciales'

function formatearFecha(fecha) {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleDateString('es-UY')
}

export function Organizaciones() {
  const { busqueda = '' } = useOutletContext() ?? {}
  const [organizaciones, setOrganizaciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerTodasOrganizaciones()
      .then((organizaciones) => {
        setOrganizaciones(organizaciones)
        setCargando(false)
      })
      .catch((error) => {
        setError(error.message || 'Error al obtener las organizaciones')
        setCargando(false)
      })
  }, [])

  const organizacionesFiltradas = useMemo(
    () => filtrarOrganizaciones(organizaciones, busqueda),
    [organizaciones, busqueda],
  )

  if (cargando) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Cargando organizaciones...</p>
      </div>
    )
  }

  if (error && organizaciones.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <div className="rounded-xl border border-red-200 bg-white p-5">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-7 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-[#152943]">
          Organizaciones
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {organizacionesFiltradas.length} organizaciones registradas
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="mb-2 hidden gap-4 px-6 py-3 text-xs font-bold tracking-wider text-gray-400 md:grid md:grid-cols-[2.5fr_2.5fr_1.5fr_1fr_1fr_1.5fr]">
        <span>NOMBRE</span>
        <span>DOMINIO</span>
        <span>PLAN</span>
        <span>USUARIOS</span>
        <span>ESTADO</span>
        <span>REGISTRO</span>
      </div>

      {organizacionesFiltradas.length === 0 ? (
        <div className="rounded-2xl border border-[#EAEAEA] bg-white p-10 text-center">
          <p className="text-sm text-gray-500">No hay organizaciones registradas.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {organizacionesFiltradas.map((organizacion) => (
            <div
              key={organizacion.id}
              className="grid grid-cols-2 items-center gap-3 rounded-2xl border border-[#EAEAEA] bg-white p-4 shadow-sm transition hover:shadow-md md:grid-cols-[2.5fr_2.5fr_1.5fr_1fr_1fr_1.5fr] md:gap-4 md:px-6 md:py-4"
            >
              <div className="col-span-2 flex items-center gap-3 md:col-span-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DDEBD7] text-sm font-semibold text-[#47734A]">
                  {obtenerIniciales(organizacion.nombre) || 'Org'}
                </div>
                <p className="truncate text-sm font-semibold text-[#152943]">
                  {organizacion.nombre || 'Sin nombre'}
                </p>
              </div>

              <div className="col-span-2 truncate text-sm text-gray-500 md:col-span-1">
                {organizacion.dominio || '—'}
              </div>

              <div className="text-sm text-gray-500">{organizacion.plan || '—'}</div>

              <div className="text-sm text-gray-500">
                {organizacion.cantidadUsuarios}
              </div>

              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    organizacion.activo
                      ? 'bg-green-50 text-green-700'
                      : 'bg-orange-50 text-orange-600'
                  }`}
                >
                  {organizacion.activo ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                {formatearFecha(organizacion.fechaCreacion)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
