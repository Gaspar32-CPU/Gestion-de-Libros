export const TIPOS_MENSAJE = [
  {
    tipo: 'prestamo',
    titulo: 'Préstamo confirmado',
    mensajePorDefecto:
      'Hola {lector}, tu préstamo de "{libro}" fue confirmado. Retiralo en {lugar_retiro}.',
  },
  {
    tipo: 'recordatorio_vencimiento',
    titulo: 'Recordatorio de vencimiento',
    mensajePorDefecto:
      'Hola {lector}, te recordamos que "{libro}" vence el {fecha_vencimiento}.',
  },
  {
    tipo: 'vencido',
    titulo: 'Préstamo vencido',
    mensajePorDefecto:
      'Hola {lector}, el préstamo de "{libro}" venció el {fecha_vencimiento}. Devolvelo en {lugar_devolucion}.',
  },
  {
    tipo: 'devolucion',
    titulo: 'Devolución registrada',
    mensajePorDefecto: 'Hola {lector}, registramos la devolución de "{libro}". ¡Gracias!',
  },
]

// Datos que se completan solos al enviar el mensaje.
export const VARIABLES_MENSAJE = [
  { clave: '{lector}', etiqueta: 'Lector' },
  { clave: '{libro}', etiqueta: 'Libro' },
  { clave: '{fecha_vencimiento}', etiqueta: 'Vencimiento' },
  { clave: '{lugar_retiro}', etiqueta: 'Lugar de retiro' },
  { clave: '{lugar_devolucion}', etiqueta: 'Lugar de devolución' },
]

// Combina lo que viene del back con los tipos conocidos, para que siempre
// estén todos (los que falten se agregan activos y con el mensaje por defecto).
export function completarMensajes(mensajes) {
  const lista = Array.isArray(mensajes) ? mensajes : []
  return TIPOS_MENSAJE.map(({ tipo, mensajePorDefecto }) => {
    const guardado = lista.find((m) => m.tipo === tipo)
    return {
      tipo,
      mensaje: guardado?.mensaje ?? mensajePorDefecto,
      activo: guardado?.activo ?? true,
    }
  })
}
