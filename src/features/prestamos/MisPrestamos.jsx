import PrestamosPanel from './components/PrestamosPanel'
import {
  obtenerMisPrestamos,
  marcarPrestamoDevuelto,
  marcarPrestamoRetirado,
  extenderPrestamo,
} from './prestamosService'

export default function MisPrestamos() {
  return (
    <PrestamosPanel
      titulo="Préstamos y devoluciones"
      subtitulo="Marcá devoluciones y seguí el estado de cada préstamo."
      cargarPrestamos={obtenerMisPrestamos}
      mostrarExtender
      onMarcarRetirado={marcarPrestamoRetirado}
      onMarcarDevuelto={marcarPrestamoDevuelto}
      onExtender={extenderPrestamo}
    />
  )
}
