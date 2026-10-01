import PrestamosPanel from './components/PrestamosPanel';
import { obtenerTodosLosPrestamos, marcarPrestamoDevuelto } from './prestamosService';

export default function TodosLosPrestamos() {
  return (
    <PrestamosPanel
      titulo="Préstamos y devoluciones"
      subtitulo="Marcá devoluciones y seguí el estado de los préstamos de tu organización."
      cargarPrestamos={obtenerTodosLosPrestamos}
      onMarcarDevuelto={marcarPrestamoDevuelto}
    />
  );
}
