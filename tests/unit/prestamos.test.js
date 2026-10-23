import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizarPrestamo } from '../../src/features/prestamos/normalizarPrestamo.js'

const fila = {
  id: 17,
  titulo: 'Libro de prueba',
  autor: 'Autor de prueba',
  portada: '/prueba.png',
  nombre_usuario: 'Persona Prueba',
  lugar_retiro: 'Biblioteca',
  fecha_devolucion_esperada: '2026-11-01',
  fecha_devolucion_real: null,
  extensiones_realizadas: 1,
  estado: 'activo',
  max_extensiones: 2,
}
test('UT-FE-023 Normaliza fila completa sin perder fechas ni límites', () => {
  assert.deepEqual(normalizarPrestamo(fila), {
    id: 17,
    libro: {
      titulo: fila.titulo,
      autor: fila.autor,
      portadaUrl: '/prueba.png',
    },
    usuario: 'Persona Prueba',
    retiro: 'Biblioteca',
    fechaMaxima: '2026-11-01',
    fechaDevolucion: null,
    extensionesRealizadas: 1,
    estado: 'ACTIVO',
    maxExtensiones: 2,
  })
})
test('UT-FE-024 Completa datos opcionales ausentes', () => {
  const resultado = normalizarPrestamo({
    id: 1,
    titulo: 'Prueba',
    autor: 'Prueba',
  })
  assert.equal(resultado.libro.portadaUrl, '')
  assert.equal(resultado.retiro, '')
  assert.equal(resultado.fechaMaxima, null)
  assert.equal(resultado.fechaDevolucion, null)
  assert.equal(resultado.extensionesRealizadas, 0)
  assert.equal(resultado.estado, '')
})
test('UT-FE-025 Convierte pendiente_retiro al estado de la interfaz', () =>
  assert.equal(
    normalizarPrestamo({ ...fila, estado: 'pendiente_retiro' }).estado,
    'PENDIENTE_RETIRO',
  ))
test('UT-FE-026 Conserva fecha de devolución registrada', () =>
  assert.equal(
    normalizarPrestamo({
      ...fila,
      estado: 'devuelto',
      fecha_devolucion_real: '2026-10-23',
    }).fechaDevolucion,
    '2026-10-23',
  ))
test('UT-FE-027 No modifica el objeto de origen', () => {
  const congelada = Object.freeze({ ...fila })
  normalizarPrestamo(congelada)
  assert.equal(congelada.estado, 'activo')
})
