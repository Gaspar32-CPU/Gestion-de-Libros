import { useOutletContext } from 'react-router-dom';
import PrestamosPanel from './components/PrestamosPanel';
import { obtenerTodosLosPrestamos, marcarPrestamoRetirado, marcarPrestamoDevuelto } from './prestamosService';

export default function TodosLosPrestamos() {
  const { busqueda = '' } = useOutletContext() ?? {};

  return (
    <PrestamosPanel
      titulo="Préstamos y devoluciones"
      subtitulo="Marcá devoluciones y seguí el estado de los préstamos de tu organización."
      busqueda={busqueda}
      onMarcarRetirado={marcarPrestamoRetirado}
      cargarPrestamos={obtenerTodosLosPrestamos}
      onMarcarDevuelto={marcarPrestamoDevuelto}
    />
  );
}
