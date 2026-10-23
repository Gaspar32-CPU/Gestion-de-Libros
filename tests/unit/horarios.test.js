import test from 'node:test'
import assert from 'node:assert/strict'
import { puedeRetirarManana } from '../../src/features/prestamos/utils/horarios.js'
import {
  completarHorarios,
  horarioInvalido,
} from '../../src/features/configuraciones/data/horarios.js'

process.env.TZ = 'America/Montevideo'
const horario = { apertura: '08:00', cierre: '17:00' }
const semana = { 1: horario, 2: horario, 3: horario, 4: horario, 5: horario }
function fijarFecha(t, fecha) {
  t.mock.timers.enable({ apis: ['Date'], now: new Date(fecha) })
}
test('UT-FE-028 Informa retiro mañana si está abierto', (t) => {
  fijarFecha(t, '2026-10-19T12:00:00-03:00')
  assert.deepEqual(puedeRetirarManana(semana), {
    disponibleManana: true,
    dia: 'Martes',
    fecha: '2026-10-20',
    horario: '08:00 a 17:00',
  })
})
test('UT-FE-029 Salta fin de semana cerrado', (t) => {
  fijarFecha(t, '2026-10-23T12:00:00-03:00')
  const resultado = puedeRetirarManana(semana)
  assert.equal(resultado.disponibleManana, false)
  assert.equal(resultado.proximoDisponible.fecha, '2026-10-26')
  assert.equal(resultado.proximoDisponible.diaSemana, 'Lunes')
})
test('UT-FE-030 Salta feriado y encuentra próximo día abierto', (t) => {
  fijarFecha(t, '2026-10-19T12:00:00-03:00')
  const resultado = puedeRetirarManana(semana, ['2026-10-20'])
  assert.equal(resultado.disponibleManana, false)
  assert.equal(resultado.proximoDisponible.fecha, '2026-10-21')
})
test('UT-FE-031 Devuelve null si no abre en el horizonte de búsqueda', (t) => {
  fijarFecha(t, '2026-10-19T12:00:00-03:00')
  assert.deepEqual(puedeRetirarManana({}), {
    disponibleManana: false,
    proximoDisponible: null,
  })
})
test('UT-FE-032 Respeta cambio de mes', (t) => {
  fijarFecha(t, '2026-10-31T12:00:00-03:00')
  assert.equal(puedeRetirarManana({ 0: horario }).fecha, '2026-11-01')
})
test('UT-FE-033 Conserva la fecha local al consultar de noche', (t) => {
  fijarFecha(t, '2026-10-19T23:30:00-03:00')
  assert.equal(puedeRetirarManana(semana).fecha, '2026-10-20')
})
test('UT-FE-034 Reconoce el feriado local al consultar de noche', (t) => {
  fijarFecha(t, '2026-10-19T23:30:00-03:00')
  const resultado = puedeRetirarManana(semana, ['2026-10-20'])
  assert.equal(resultado.disponibleManana, false)
  assert.equal(resultado.proximoDisponible.diaSemana, 'Miércoles')
})
test('UT-FE-035 Completa siete días conservando configuración existente', () => {
  const resultado = completarHorarios([
    { dia: 1, abierto: false, apertura: '10:00', cierre: '15:00' },
  ])
  assert.equal(resultado.length, 7)
  assert.deepEqual(resultado[1], {
    dia: 1,
    abierto: false,
    apertura: '10:00',
    cierre: '15:00',
  })
  assert.equal(resultado[0].abierto, false)
  assert.equal(resultado[2].abierto, true)
})
test('UT-FE-036 Tolera configuración inicial ausente', () =>
  assert.equal(completarHorarios(null).length, 7))
test('UT-FE-037 Horario de apertura anterior al cierre es válido', () =>
  assert.equal(
    horarioInvalido([
      { dia: 1, abierto: true, apertura: '08:00', cierre: '17:00' },
    ]),
    undefined,
  ))
test('UT-FE-038 Rechaza cierre anterior a apertura', () => {
  const dia = { dia: 1, abierto: true, apertura: '18:00', cierre: '08:00' }
  assert.equal(horarioInvalido([dia]), dia)
})
test('UT-FE-039 Rechaza apertura y cierre iguales', () =>
  assert.ok(
    horarioInvalido([{ abierto: true, apertura: '08:00', cierre: '08:00' }]),
  ))
test('UT-FE-040 Rechaza horario incompleto de día abierto', () =>
  assert.ok(
    horarioInvalido([{ abierto: true, apertura: '', cierre: '17:00' }]),
  ))
test('UT-FE-041 Permite día cerrado sin horas', () =>
  assert.equal(
    horarioInvalido([{ abierto: false, apertura: '', cierre: '' }]),
    undefined,
  ))
