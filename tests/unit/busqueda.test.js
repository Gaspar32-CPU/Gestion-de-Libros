import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizarTexto } from '../../src/utils/normalizarTexto.js'

test('UT-FE-042 Iguala tildes y mayúsculas para buscar', () =>
  assert.equal(normalizarTexto('ÁRBOL Ñandú'), 'arbol nandu'))
test('UT-FE-043 Permite coincidencia parcial normalizada', () =>
  assert.equal(
    normalizarTexto('Crónica de una muerte anunciada').includes(
      normalizarTexto('CRONICA'),
    ),
    true,
  ))
test('UT-FE-044 Texto vacío y ausente producen búsqueda vacía', () => {
  assert.equal(normalizarTexto(''), '')
  assert.equal(normalizarTexto(null), '')
  assert.equal(normalizarTexto(undefined), '')
})
