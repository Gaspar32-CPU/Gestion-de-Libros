import { dias } from '../../prestamos/utils/horarios'

export function completarHorarios(horarios) {
  const lista = Array.isArray(horarios) ? horarios : []
  return dias.map(({ numero, abierto }) => {
    const guardado = lista.find((h) => h.dia === numero)
    return {
      dia: numero,
      abierto: guardado?.abierto ?? abierto,
      apertura: guardado?.apertura ?? '08:00',
      cierre: guardado?.cierre ?? '17:00',
    }
  })
}

export function nombreDia(numero) {
  return dias.find((d) => d.numero === numero)?.nombre ?? ''
}

export function horarioInvalido(horarios) {
  return horarios.find(
    (h) => h.abierto && (!h.apertura || !h.cierre || h.apertura >= h.cierre),
  )
}
