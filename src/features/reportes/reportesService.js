import api from '../../services/api';

// Largo máximo de la descripción de un reporte y del comentario de
// resolución. Mismo límite que valida el backend (MAX_CARACTERES_REPORTE).
export const MAX_CARACTERES_REPORTE = 500;

// GET /api/secciones: devuelve [{ id, nombre }] ordenadas para el selector.
export async function obtenerSecciones() {
  const { data } = await api.get('/secciones');
  return data;
}

// POST /api/reportes: guarda el reporte. El usuario, la organización y la
// fecha los pone el backend a partir del token, no hace falta mandarlos.
export async function enviarReporte({ idSeccion, descripcion }) {
  const { data } = await api.post('/reportes', { idSeccion, descripcion });
  return data;
}
