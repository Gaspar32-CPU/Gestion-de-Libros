function calcularProximoDiaRetiro(fechaBase, horarioInstitucion, feriados = [], maxDiasBusqueda = 14) {
  const fecha = new Date(fechaBase);

  for (let i = 0; i < maxDiasBusqueda; i++) {
    const fechaStr = formatearFecha(fecha); // "YYYY-MM-DD"
    const diaSemana = fecha.getDay();
    const horario = horarioInstitucion[diaSemana];

    const esFeriado = feriados.includes(fechaStr);

    if (horario && !esFeriado) {
      return {
        fecha: fechaStr,
        diaSemana: nombreDia(diaSemana),
        apertura: horario.apertura,
        cierre: horario.cierre,
        esHoyOManana: i === 0 ? "mañana" : null,
      };
    }

    // avanzar al día siguiente
    fecha.setDate(fecha.getDate() + 1);
  }

  return null; // no encontró día hábil en el rango de búsqueda
}

function formatearFecha(fecha) {
  return fecha.toISOString().split("T")[0];
}

function nombreDia(numeroDia) {
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return dias[numeroDia];
}

export function puedeRetirarManana(horarioInstitucion, feriados = []) {
  const hoy = new Date();
  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);

  const diaSemana = manana.getDay();
  const fechaStr = formatearFecha(manana);
  const horario = horarioInstitucion[diaSemana];
  const esFeriado = feriados.includes(fechaStr);

  if (horario && !esFeriado) {
    return {
      disponibleManana: true,
      dia: nombreDia(diaSemana),
      fecha: fechaStr,
      horario: `${horario.apertura} a ${horario.cierre}`,
    };
  }

  // si mañana no se puede, buscamos el próximo día hábil
  const proximoDisponible = calcularProximoDiaRetiro(manana, horarioInstitucion, feriados);

  return {
    disponibleManana: false,
    proximoDisponible,
  };
}