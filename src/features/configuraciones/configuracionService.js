import api from '../../services/api'
import { completarMensajes } from './data/mensajes'
import { completarHorarios } from './data/horarios'

function normalizarConfiguracion(config) {
  return {
    id: config.id,
    organizacionId: config.organizacionId,
    nombreApp: config.nombreApp ?? '',
    logo: config.logo ?? null,
    colorPrimario: config.colorPrimario ?? '#000000',
    colorSecundario: config.colorSecundario ?? null,
    maxLibrosPorUsuario: config.maxLibrosPorUsuario ?? 3,
    lugarRetiro: config.lugarRetiro ?? '',
    lugarDevolucion: config.lugarDevolucion ?? '',
    horarios: completarHorarios(config.horarios),
    diasPrestamo: config.diasPrestamo ?? 30,
    permiteExtension: Boolean(config.permiteExtension),
    maxExtensiones: config.maxExtensiones ?? 2,
    diasExtension: config.diasExtension ?? 30,
    congelarUsuarios: Boolean(config.congelarUsuarios),
    diasAtrasoCongelamiento: config.diasAtrasoCongelamiento ?? null,
    mensajesPersonalizados: completarMensajes(config.mensajesPersonalizados),
  }
}

function configuracionParaEnviar(config) {
  // eslint-disable-next-line no-unused-vars
  const { id, organizacionId, logo, ...campos } = config
  return {
    ...campos,
    nombreApp: campos.nombreApp.trim(),
    lugarRetiro: campos.lugarRetiro.trim(),
    lugarDevolucion: campos.lugarDevolucion.trim() || null,
    diasAtrasoCongelamiento: campos.congelarUsuarios
      ? campos.diasAtrasoCongelamiento
      : null,
  }
}

export async function obtenerMiConfiguracion(id) {
  const { data } = await api.get(`/organizaciones/${id}/configuracion`)
  return normalizarConfiguracion(data)
}

export async function crearConfiguracion(id, config) {
  const { data } = await api.post(
    `/organizaciones/${id}/configuracion`,
    configuracionParaEnviar(config),
  )
  return normalizarConfiguracion(data)
}

export async function editarMiConfiguracion(id, config) {
  const { data } = await api.put(
    `/organizaciones/${id}/configuracion`,
    configuracionParaEnviar(config),
  )
  return normalizarConfiguracion(data)
}

export async function subirLogo(id, archivo) {
  const body = new FormData()
  body.append('logo', archivo)
  const { data } = await api.post(
    `/organizaciones/${id}/configuracion/logo`,
    body,
  )
  return normalizarConfiguracion(data)
}

export async function quitarLogo(id) {
  const { data } = await api.delete(`/organizaciones/${id}/configuracion/logo`)
  return normalizarConfiguracion(data)
}

export async function eliminarMiConfiguracion(id) {
  const { data } = await api.delete(`/organizaciones/${id}/configuracion`)
  return data
}
