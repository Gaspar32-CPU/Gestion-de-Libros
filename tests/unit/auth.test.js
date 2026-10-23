import test from 'node:test'
import assert from 'node:assert/strict'
import {
  loginSchema,
  registerSchema,
  crearContrasenaSchema,
} from '../../schemas/auth.schema.js'

// Datos ficticios: no se crean cuentas ni se envían correos.
const registro = {
  nombre: 'Persona',
  apellido: 'Prueba',
  cedula: '12345672',
  correo: 'lector@institucion.example',
  telefono: '099123456',
}
const casos = [
  [
    'UT-FE-001 Registro válido',
    () => assert.equal(registerSchema.safeParse(registro).success, true),
  ],
  [
    'UT-FE-002 Cédula de 7 dígitos válida',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, cedula: '1234561' }).success,
        true,
      ),
  ],
  [
    'UT-FE-003 Rechaza dígito verificador incorrecto',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, cedula: '12345673' }).success,
        false,
      ),
  ],
  [
    'UT-FE-004 Rechaza cédula con letras',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, cedula: '1234567X' }).success,
        false,
      ),
  ],
  [
    'UT-FE-005 Rechaza cédula con longitud incorrecta',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, cedula: '12345' }).success,
        false,
      ),
  ],
  [
    'UT-FE-006 Rechaza cédula con separadores',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, cedula: '1.234.567-2' })
          .success,
        false,
      ),
  ],
  [
    'UT-FE-007 Rechaza correo personal',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, correo: 'prueba@gmail.com' })
          .success,
        false,
      ),
  ],
  [
    'UT-FE-008 Rechaza proveedor personal en mayúsculas',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, correo: 'PRUEBA@GMAIL.COM' })
          .success,
        false,
      ),
  ],
  [
    'UT-FE-009 Rechaza correo mal formado',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, correo: 'sin-arroba' }).success,
        false,
      ),
  ],
  [
    'UT-FE-010 Rechaza correo vacío',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, correo: '' }).success,
        false,
      ),
  ],
  [
    'UT-FE-011 Acepta teléfono con espacios',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, telefono: '099 123 456' })
          .success,
        true,
      ),
  ],
  [
    'UT-FE-012 Rechaza teléfono con letras',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, telefono: '099ABC456' })
          .success,
        false,
      ),
  ],
  [
    'UT-FE-013 Rechaza teléfono corto',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, telefono: '099123' }).success,
        false,
      ),
  ],
  [
    'UT-FE-014 Rechaza nombre vacío',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, nombre: '' }).success,
        false,
      ),
  ],
  [
    'UT-FE-015 Rechaza nombre compuesto solo por espacios',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, nombre: '   ' }).success,
        false,
      ),
  ],
  [
    'UT-FE-016 Rechaza apellido compuesto solo por espacios',
    () =>
      assert.equal(
        registerSchema.safeParse({ ...registro, apellido: '   ' }).success,
        false,
      ),
  ],
  [
    'UT-FE-017 Recorta espacios exteriores del nombre',
    () =>
      assert.equal(
        registerSchema.parse({ ...registro, nombre: ' Persona ' }).nombre,
        'Persona',
      ),
  ],
  [
    'UT-FE-018 Login acepta contraseña de 6 caracteres',
    () =>
      assert.equal(
        loginSchema.safeParse({ email: registro.correo, password: 'abc123' })
          .success,
        true,
      ),
  ],
  [
    'UT-FE-019 Login rechaza contraseña de 5 caracteres',
    () =>
      assert.equal(
        loginSchema.safeParse({ email: registro.correo, password: 'abc12' })
          .success,
        false,
      ),
  ],
  [
    'UT-FE-020 Creación acepta contraseñas coincidentes',
    () =>
      assert.equal(
        crearContrasenaSchema.safeParse({
          contrasena: 'abc123',
          confirmarContrasena: 'abc123',
        }).success,
        true,
      ),
  ],
  [
    'UT-FE-021 Rechaza confirmación diferente',
    () =>
      assert.equal(
        crearContrasenaSchema.safeParse({
          contrasena: 'abc123',
          confirmarContrasena: 'abc124',
        }).success,
        false,
      ),
  ],
  [
    'UT-FE-022 Rechaza contraseña corta al crearla',
    () =>
      assert.equal(
        crearContrasenaSchema.safeParse({
          contrasena: 'abc12',
          confirmarContrasena: 'abc12',
        }).success,
        false,
      ),
  ],
]
for (const [nombre, comprobar] of casos) test(nombre, comprobar)
