import api from '../../services/api';

// Mapeo según GET /api/prestamos/mis-prestamos en backend---gestor-de-libros/index.js:
// devuelve las filas de "prestamos" con join a "libros" (sin anidar), en snake_case.
function normalizarPrestamo(prestamo) {
  return {
    id: prestamo.id,
    libro: {
      titulo: prestamo.titulo,
      autor: prestamo.autor,
      portadaUrl: prestamo.portada ?? '',
    },
    retiro: prestamo.lugar_retiro ?? '',
    fechaMaxima: prestamo.fecha_devolucion_esperada ?? null,
    fechaDevolucion: prestamo.fecha_devolucion_real ?? null,
    extensionesRealizadas: prestamo.extensiones_realizadas ?? 0,
    estado: (prestamo.estado ?? '').toUpperCase(),
  };
}

export async function obtenerMisPrestamos() {
  const { data } = await api.get('/prestamos/mis-prestamos');
  return data.map(normalizarPrestamo);
}

// El admin ve todos los préstamos de su organización (el back filtra por
// organizacionId a partir del token, no hace falta mandarlo desde acá).
export async function obtenerTodosLosPrestamos() {
  const { data } = await api.get('/prestamos/mis-prestamos');
  return data.map(normalizarPrestamo);
}

export async function marcarPrestamoDevuelto(id) {
  const { data } = await api.patch(`/prestamos/${id}/devolver`);
  return normalizarPrestamo(data);
}

export async function extenderPrestamo(id) {
  const { data } = await api.patch(`/prestamos/mis-prestamos/${id}/extender`);
  return data.fecha_devolucion_esperada;
}
