import api from '../../services/api';

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
