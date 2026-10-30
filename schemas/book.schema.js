import { z } from 'zod'

// ---- ISBN ----
export const isbnSchema = z.object({
  isbn: z
    .string()
    // Se aceptan guiones y espacios (ej. 978-84-376-0494-7) y se normalizan
    .transform((valor) => valor.replace(/[\s-]/g, ''))
    .pipe(
      z
        .string()
        .regex(
          /^(?:\d{9}[\dXx]|\d{13})$/,
          'Formato de ISBN inválido (10 o 13 dígitos)',
        ),
    ),
})
