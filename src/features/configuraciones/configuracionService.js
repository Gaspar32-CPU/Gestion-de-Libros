import api from '../../services/api'
import { normalizarTexto } from '../../utils/normalizarTexto'

const ETIQUETAS_ROL = {
  lector: 'Lector',
  admin: 'Administrador',
  'super-admin': 'Super admin',
}

function normalizarConfiguracion(config) {
  return {
    id: config.id,
    organizacionId: config.id_organizacion,
    nombreApp: config.nombre_app ?? 'Biblioteca',
    logo: config.logo ?? null,
    colorPrimario: config.color_primario ?? '#000000',
    colorSecundario: config.color_secundario ?? null,
    maxLibrosPorUsuario: config.max_libros_por_usuario ?? 3,
    lugarRetiro: config.lugar_retiro ?? '',
    lugarDevolucion: config.lugar_devolucion ?? '',
    diasPrestamo: config.dias_prestamo ?? null,
    permiteExtension: Boolean(config.permite_extension),
    maxExtensiones: config.max_extensiones ?? 2,
    diasExtension: config.dias_extension ?? 30,
    congelarUsuarios: Boolean(config.congelar_usuarios),
    diasAtrasoCongelamiento: config.dias_atraso_congelamiento ?? null,
    mensajesPersonalizados: parsearJSON(config.mensajes_personalizados),
  }
}

function parsearJSON(valor) {
  if (valor == null) return {}
  if (typeof valor === 'object') return valor
  try {
    return JSON.parse(valor)
  } catch {
    return {}
  }
}

export async function obtenerMiConfiguracion(id) {
  const { data } = await api.get(`/organizaciones/${id}/configuracion`)
  return normalizarConfiguracion(data)
}

export async function crearConfiguracion(id, config) {
  const { data } = await api.post(`/organizaciones/${id}/configuracion`, config)
  return normalizarConfiguracion(data)
}

export async function editarMiConfiguracion(id, config) {
  const { data } = await api.put(`/organizaciones/${id}/configuracion`, config)
  return normalizarConfiguracion(data)
}

export async function eliminarMiConfiguracion(id, config) {
  const { data } = await api.delete(
    `/organizaciones/${id}/configuracion`,
    config,
  )
  return normalizarConfiguracion(data)
}
