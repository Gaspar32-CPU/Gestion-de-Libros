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
// ---- LOGIN ----
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresá un correo válido")
    .refine((val) => isInstitutionalEmail(val), {
      message: "Usa tu correo institucional (ej: @anima.edu.uy)",
    }),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// ---- REGISTRO ----
export const registerSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").trim(),
  apellido: z.string().min(1, "El apellido es obligatorio").trim(),
  cedula: z
    .string()
    .regex(/^\d{7,8}$/, "La cédula debe tener 7 u 8 dígitos, sin puntos ni guión (ej: 51234567)")
    .refine(isValidCedulaUY, "El dígito verificador de la cédula no es correcto"),
  correo: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Ingresá un correo válido")
    .refine((val) => isInstitutionalEmail(val), {
      message: "Usa tu correo institucional (ej: @anima.edu.uy)",
    }),
  telefono: z
    .string()
    .regex(/^0\d{2}\s?\d{3}\s?\d{3}$/, "Formato de teléfono inválido (ej: 099 123 456)"),
  contrasena: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmarContrasena: z.string().min(1, "Confirmá tu contraseña"),
}).refine((data) => data.contrasena === data.confirmarContrasena, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarContrasena"],
});