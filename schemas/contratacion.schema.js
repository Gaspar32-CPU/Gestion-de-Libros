import { z } from "zod";

// ---- CUENTA (paso 1: el usuario que va a administrar la nueva organización) ----
export const cuentaSchema = z.object({
  nombre: z.string().trim().min(1, "Completá nombre y apellido."),
  apellido: z.string().trim().min(1, "Completá nombre y apellido."),
  cedula: z.string().trim().min(1, "Ingresá tu cédula."),
  telefono: z.string().trim().min(1, "Ingresá tu teléfono."),
  correo: z
    .string()
    .trim()
    .min(1, "Ingresá tu correo.")
    .email("Ingresá un correo institucional válido."),
  contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

// ---- ORGANIZACIÓN (paso 2) ----
export const organizacionSchema = z.object({
  organizacion: z.string().trim().min(1, "Ingresá el nombre de la organización."),
  dominio: z.string().trim().min(1, "Ingresá el dominio de correo de tu institución."),
});

// ---- PAGO (paso 3) ----
export const pagoSchema = z.object({
  nombreTarjeta: z.string().trim().min(1, "Completá los datos de la tarjeta."),
  numeroTarjeta: z.string().trim().min(1, "Completá los datos de la tarjeta."),
  vencimiento: z.string().trim().min(1, "Completá los datos de la tarjeta."),
  cvv: z.string().trim().min(1, "Completá los datos de la tarjeta."),
});
