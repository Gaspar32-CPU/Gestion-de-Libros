// La tabla "planes" solo guarda el precio mensual. El anual se calcula acá:
// 10 meses en lugar de 12 = "2 meses sin cargo", lo que promete la landing.
const MESES_COBRADOS_POR_ANIO = 10;

export function precioDelPlan(plan, ciclo) {
  return ciclo === "anual" ? plan.precioMensual * MESES_COBRADOS_POR_ANIO : plan.precioMensual;
}

export function equivalenteMensualAnual(plan) {
  return Math.round((plan.precioMensual * MESES_COBRADOS_POR_ANIO) / 12);
}

// Nombres legibles para las claves de la columna JSON "funcionalidades".
const NOMBRES_FUNCIONALIDADES = {
  reservas: "Reservas de libros",
  reportes: "Reportes de circulación",
};

// { reservas: true, reportes: false } -> [{ nombre: "Reservas de libros", incluida: true }, ...]
export function funcionalidadesDelPlan(plan) {
  return Object.entries(plan.funcionalidades ?? {}).map(([clave, incluida]) => ({
    nombre: NOMBRES_FUNCIONALIDADES[clave] ?? clave.charAt(0).toUpperCase() + clave.slice(1),
    incluida: Boolean(incluida),
  }));
}
