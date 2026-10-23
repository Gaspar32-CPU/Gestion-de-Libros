import api from '../../services/api'

// Mapeo según GET /api/prestamos/mis-prestamos en backend---gestor-de-libros/index.js:
// devuelve las filas de "prestamos" con join a "libros" (sin anidar), en snake_case.
import { normalizarPrestamo } from './normalizarPrestamo.js'

export async function obtenerMisPrestamos() {
  const { data } = await api.get('/prestamos/mis-prestamos')
  return data.map(normalizarPrestamo)
}

// El admin ve todos los préstamos de su organización (el back filtra por
// organizacionId a partir del token, no hace falta mandarlo desde acá).
export async function obtenerTodosLosPrestamos() {
  const { data } = await api.get('/prestamos/mis-prestamos')
  return data.map(normalizarPrestamo)
}

export async function marcarPrestamoDevuelto(id) {
  const { data } = await api.patch(`/prestamos/${id}/devolver`)
  return normalizarPrestamo(data)
}

export async function marcarPrestamoRetirado(id) {
  const { data } = await api.patch(`/prestamos/${id}/retirado`)
  return normalizarPrestamo(data)
}

export async function cancelarPrestamo(id) {
  const { data } = await api.patch(`/prestamos/${id}/cancelar`)
  return normalizarPrestamo(data)
}

export async function extenderPrestamo(id) {
  const { data } = await api.patch(`/prestamos/mis-prestamos/${id}/extender`)
  return normalizarPrestamo(data)
}
