import { useEffect, useState } from 'react';
import { obtenerReportesSoporte } from './soporteService';

const EVENTO = 'soporte-actualizado';

// La pantalla Soporte llama a esto después de tomar o resolver un reporte,
// para que el número del menú y la lista se vuelvan a calcular.
export function avisarCambioSoporte() {
  window.dispatchEvent(new Event(EVENTO));
}

// Única fuente de los reportes de soporte: la usa tanto el badge del menú
// como la pantalla Soporte, para no duplicar el fetch.
export function usePendientesSoporte() {
  const [reportes, setReportes] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let activo = true;

    function cargar() {
      obtenerReportesSoporte()
        .then((datos) => {
          if (!activo) return;
          setReportes(datos);
          setError(false);
        })
        .catch(() => {
          if (activo) setError(true);
        })
        .finally(() => {
          if (activo) setCargado(true);
        });
    }

    cargar();
    window.addEventListener(EVENTO, cargar);
    return () => {
      activo = false;
      window.removeEventListener(EVENTO, cargar);
    };
  }, []);

  const pendientes = reportes.filter((r) => r.estado !== 'resuelto').length;

  return { pendientes, reportes, cargado, error };
}
