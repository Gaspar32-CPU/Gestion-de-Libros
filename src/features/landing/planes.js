// La tabla "planes" solo guarda el precio mensual. El anual se calcula acá
// como 12 meses, sin descuento por ciclo.
const MESES_POR_ANIO = 12

// El plan Premium tiene un 10% de descuento, en ambos ciclos.
const DESCUENTO_PREMIUM = 10

// Porcentaje de descuento del plan (0 si no tiene).
export function descuentoDelPlan(plan) {
  return plan.nombre?.toLowerCase() === 'premium' ? DESCUENTO_PREMIUM : 0
}

// Precio sin descuento, para mostrarlo tachado al lado del precio final.
export function precioSinDescuento(plan, ciclo) {
  return ciclo === 'anual'
    ? plan.precioMensual * MESES_POR_ANIO
    : plan.precioMensual
}

export function precioDelPlan(plan, ciclo) {
  const precio = precioSinDescuento(plan, ciclo)
  return Math.round(precio * (1 - descuentoDelPlan(plan) / 100))
}

// "usuarios" formateado (5000 -> "5.000"). Si el plan viene sin
// ese dato, muestra "–" en vez de romper la pantalla o inventar un 0.
export function limiteDelPlan(plan, clave) {
  const valor = plan.limites?.[clave]
  return typeof valor === 'number' ? valor.toLocaleString('es-UY') : '–'
}

// Nombres legibles para las claves de la columna JSON "funcionalidades".
const NOMBRES_FUNCIONALIDADES = {
  reservas: 'Reservas de libros',
  reportes: 'Reportes de circulación',
}

// { reservas: true, reportes: false } -> [{ nombre: "Reservas de libros", incluida: true }, ...]
export function funcionalidadesDelPlan(plan) {
  return Object.entries(plan.funcionalidades ?? {}).map(
    ([clave, incluida]) => ({
      nombre:
        NOMBRES_FUNCIONALIDADES[clave] ??
        clave.charAt(0).toUpperCase() + clave.slice(1),
      incluida: Boolean(incluida),
    }),
  )
}
