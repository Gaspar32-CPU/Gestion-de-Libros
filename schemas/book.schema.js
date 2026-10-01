import { z } from "zod";

// ---- ISBN ----
export const isbnSchema = z.object({
  isbn: z
    .string()
    .trim()
    .regex(/^(?:\d{9}[\dXx]|\d{13})$/, "Formato de ISBN inválido (10 o 13 dígitos)"),
});
