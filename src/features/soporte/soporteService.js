import api from '../../services/api';

// GET /api/soporte/reportes: todos los reportes de todas las organizaciones
// (solo super-admin), del más nuevo al más viejo.
export async function obtenerReportesSoporte() {
  const { data } = await api.get('/soporte/reportes');
  return data;
}

// PATCH /api/soporte/reportes/:id/estado
// "Tomar" → 'en_revision' · "Resolver" → 'resuelto' (con comentario obligatorio).
// Devuelve el reporte actualizado, con quién lo tomó o resolvió.
export async function cambiarEstadoReporte(id, estado, comentario) {
  const { data } = await api.patch(`/soporte/reportes/${id}/estado`, { estado, comentario });
  return data;
}
