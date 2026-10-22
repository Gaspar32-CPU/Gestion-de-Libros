import { useEffect, useState } from 'react'
import api from '../services/api'

// Caché a nivel de módulo: los layouts se desmontan y vuelven a montar al
// cambiar de vista (LayoutSegunRol está en varias ramas de AppRoutes), y sin
// esto el sidebar quedaba un instante sin logo ni nombre hasta que volvía la
// respuesta. Se refresca igual en cada montaje, mostrando mientras tanto lo
// último que teníamos.
const cache = new Map()

export function useOrganizacion(organizacionId) {
  // Guardamos a qué organizacionId corresponden los datos para no mostrar
  // los de una organización anterior (logout, cambio de usuario, etc.).
  const [resultado, setResultado] = useState({ id: null, datos: null })

  useEffect(() => {
    if (!organizacionId) return

    let cancelado = false
    api
      .get(`/organizaciones/${organizacionId}`)
      .then((res) => {
        cache.set(organizacionId, res.data)
        if (!cancelado) setResultado({ id: organizacionId, datos: res.data })
      })
      .catch((err) => console.error('Error al traer la organización', err))

    return () => {
      cancelado = true
    }
  }, [organizacionId])

  if (!organizacionId) return null
  return resultado.id === organizacionId
    ? resultado.datos
    : (cache.get(organizacionId) ?? null)
}
