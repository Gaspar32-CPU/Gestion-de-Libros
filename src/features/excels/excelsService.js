import api from '../../services/api'

// La importación en curso se recuerda por pestaña, para retomarla si el usuario
// cambia de vista o recarga mientras se valida.
const CLAVE_IMPORTACION = 'importacionActiva'

export function importacionActiva() {
  try {
    return sessionStorage.getItem(CLAVE_IMPORTACION)
  } catch {
    return null
  }
}

export function recordarImportacion(id) {
  try {
    sessionStorage.setItem(CLAVE_IMPORTACION, id)
  } catch {
    // sin storage simplemente no se retoma
  }
}

export function olvidarImportacion() {
  try {
    sessionStorage.removeItem(CLAVE_IMPORTACION)
  } catch {
    // nada que limpiar
  }
}

// Sube el Excel y empieza a validarlo en el back. Todavía no guarda libros.
export async function subirExcel(archivo) {
  const body = new FormData()
  body.append('excel', archivo)
  const { data } = await api.post('/libros/importar', body)
  return data // { id, total }
}

// Avance de la importación; cuando termina trae la vista previa
// (listos y rechazados).
export async function obtenerImportacion(id) {
  const { data } = await api.get(`/libros/importar/${id}`)
  return data
}

// Corta la validación y descarta la importación.
export async function cancelarImportacion(id) {
  await api.delete(`/libros/importar/${id}`)
}

// Guarda en la base los libros de la vista previa.
export async function confirmarImportacion(id) {
  const { data } = await api.post(`/libros/importar/${id}/confirmar`)
  return data // { insertados }
}
