import { z } from "zod";

const ALLOWED_DOMAINS = ['@anima.edu.uy', '@estudiantes.anima.edu.uy'];

function isInstitutionalEmail(email) {
  return ALLOWED_DOMAINS.some((domain) => email.toLowerCase().endsWith(domain));
}

function isValidCedulaUY(cedula) {
  const nums = cedula.split('').map(Number);
  const verificador = nums.pop(); // último dígito

  // rellenar con cero a la izquierda si tiene 7 dígitos (sin contar verificador)
  while (nums.length < 7) nums.unshift(0);

  const factores = [2, 9, 8, 7, 6, 3, 4];
  const suma = nums.reduce((acc, n, i) => acc + n * factores[i], 0);
  const resto = suma % 10;
  const digitoEsperado = resto === 0 ? 0 : 10 - resto;

  return digitoEsperado === verificador;
}

// ---- ISBN ----
export const isbnSchema = z.object({
  isbn: z
    .string()
    .regex(
      /^(?:\d{9}[\dXx]|\d{13})$/,
      "Formato de ISBN inválido"
    )
});

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