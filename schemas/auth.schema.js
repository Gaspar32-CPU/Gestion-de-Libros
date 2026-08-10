import { z } from "zod";

// ---- LOGIN ----
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresá un correo válido")
    .refine((val) => val.endsWith("@anima.edu.uy"), {
      message: "Usa tu correo institucional (ej: @anima.edu.uy)",
    }),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// ---- REGISTRO ----
export const registerSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio").trim(),
  lastName: z.string().min(1, "El apellido es obligatorio").trim(),
  ci: z
    .string()
    .regex(/^\d{1,2}\.\d{3}\.\d{3}-\d$/, "Formato de cédula inválido (ej: 5.123.456-7)"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresá un correo válido")
    .refine((val) => val.endsWith("@anima.edu.uy"), {
      message: "Debe ser tu correo institucional (@anima.edu.uy)",
    }),
  phone: z
    .string()
    .regex(/^0\d{2}\s?\d{3}\s?\d{3}$/, "Formato de teléfono inválido (ej: 099 123 456)"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});