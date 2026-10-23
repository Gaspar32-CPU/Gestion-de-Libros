export function normalizarPrestamo(prestamo) {
  return {
    id: prestamo.id,
    libro: {
      titulo: prestamo.titulo,
      autor: prestamo.autor,
      portadaUrl: prestamo.portada ?? '',
    },
    usuario: prestamo?.nombre_usuario,
    retiro: prestamo.lugar_retiro ?? '',
    fechaMaxima: prestamo.fecha_devolucion_esperada ?? null,
    fechaDevolucion: prestamo.fecha_devolucion_real ?? null,
    extensionesRealizadas: prestamo.extensiones_realizadas ?? 0,
    estado: (prestamo.estado ?? '').toUpperCase(),
    maxExtensiones: prestamo.max_extensiones,
  }
}
