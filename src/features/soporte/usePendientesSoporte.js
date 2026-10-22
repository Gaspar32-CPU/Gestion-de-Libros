import { useEffect, useState } from 'react';
import { obtenerReportesSoporte } from './soporteService';

const EVENTO = 'soporte-actualizado';

// La pantalla Soporte llama a esto después de tomar o resolver un reporte,
// para que el número del menú se vuelva a calcular.
export function avisarCambioSoporte() {
  window.dispatchEvent(new Event(EVENTO));
}

// Cantidad de reportes no resueltos (abiertos + en curso).
export function usePendientesSoporte() {
  const [pendientes, setPendientes] = useState(0);

  useEffect(() => {
    let activo = true;

    function cargar() {
      obtenerReportesSoporte()
        .then((reportes) => {
          if (activo) setPendientes(reportes.filter((r) => r.estado !== 'resuelto').length);
        })
        .catch(() => {});
    }

    cargar();
    window.addEventListener(EVENTO, cargar);
    return () => {
      activo = false;
      window.removeEventListener(EVENTO, cargar);
    };
  }, []);

  return pendientes;
}
