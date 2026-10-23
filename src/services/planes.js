import api from './api'

export async function obtenerPlanes() {
  const { data } = await api.get('/planes')
  return data
}
