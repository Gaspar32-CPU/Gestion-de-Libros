import api from '../../services/api'
import { normalizarTexto } from '../../utils/normalizarTexto'

function normalizarOrganizacion(organizacion) {
  return {
    id: organizacion.id,
    nombre: organizacion.nombre ?? '',
    dominio: organizacion.dominio ?? '',
    plan: organizacion.plan ?? '',
    activo: organizacion.activo,
    expiracion: organizacion.expiracion ?? null,
    fechaCreacion: organizacion.fechaCreacion ?? null,
    cantidadUsuarios: organizacion.cantidadUsuarios ?? 0,
  }
}

// Todas las organizaciones (GET /api/organizaciones, solo super-admin).
export async function obtenerTodasOrganizaciones() {
  const { data } = await api.get('/organizaciones')
  return data.map(normalizarOrganizacion)
}

// Filtra por nombre o dominio, sin distinguir mayúsculas ni tildes.
export function filtrarOrganizaciones(organizaciones, busqueda) {
  const termino = normalizarTexto(busqueda)

  if (!termino) return organizaciones

  return organizaciones.filter(
    (organizacion) =>
      normalizarTexto(organizacion.nombre).includes(termino) ||
      normalizarTexto(organizacion.dominio).includes(termino),
  )
}
