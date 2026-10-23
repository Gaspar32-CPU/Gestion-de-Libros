import { useOutletContext } from 'react-router-dom'
import PrestamosPanel from './components/PrestamosPanel'
import {
  obtenerMisPrestamos,
  cancelarPrestamo,
  extenderPrestamo,
} from './prestamosService'

export default function MisPrestamos() {
  const { busqueda = '' } = useOutletContext() ?? {}

  return (
    <PrestamosPanel
      titulo="Préstamos y devoluciones"
      subtitulo="Marcá devoluciones y seguí el estado de cada préstamo."
      busqueda={busqueda}
      cargarPrestamos={obtenerMisPrestamos}
      mostrarExtender
      onCancelar={cancelarPrestamo}
      onExtender={extenderPrestamo}
    />
  )
}
