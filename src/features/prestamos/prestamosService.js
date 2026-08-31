import api from '../../services/api';

// No tenemos el contrato documentado de /prestamos/mis-prestamos (el backend
// no vive en este repo), así que este mapeo es una estimación siguiendo la
// misma convención que catalogoService.js (snake_case en la base -> camelCase
// en el front). Si el back devuelve otros nombres, ajustar solo acá.
function normalizarPrestamo(prestamo) {
  return {
    id: prestamo.id,
    libro: {
      titulo: prestamo.libro?.titulo ?? prestamo.titulo,
      autor: prestamo.libro?.autor ?? prestamo.autor,
      portadaUrl: prestamo.libro?.portada ?? prestamo.portada ?? '',
    },
    usuario: prestamo.usuario?.nombre ?? prestamo.usuario_nombre ?? '',
    retiro: prestamo.lugar_retiro ?? '',
    fechaMaxima: prestamo.fecha_vencimiento ?? null,
    fechaDevolucion: prestamo.fecha_devolucion ?? null,
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
  const { data } = await api.get('/prestamos');
  return data.map(normalizarPrestamo);
}

// Ruta adivinada, no hay endpoint documentado para marcar una devolución:
// ajustar si el back expone otra.
export async function marcarPrestamoDevuelto(id) {
  const { data } = await api.patch(`/prestamos/${id}/devolucion`);
  return normalizarPrestamo(data);
}

// El back responde solo con la nueva fecha límite (la llama
// "fecha_devolucion" aunque en rigor es el vencimiento extendido, no una
// devolución real). Devolvemos esa fecha para que la pantalla actualice el
// préstamo sin tener que volver a pedir la lista entera.
export async function extenderPrestamo(id) {
  const { data } = await api.post(`/prestamos/mis-prestamos/${id}/extender`);
  return data.fecha_devolucion;
}
