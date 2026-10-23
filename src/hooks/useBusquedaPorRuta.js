import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export function useBusquedaPorRuta() {
  const { pathname } = useLocation()
  const [busqueda, setBusqueda] = useState({ ruta: pathname, texto: '' })

  const texto = busqueda.ruta === pathname ? busqueda.texto : ''
  const buscar = (nuevoTexto) =>
    setBusqueda({ ruta: pathname, texto: nuevoTexto })

  return { busqueda: texto, buscar, ruta: pathname }
}
