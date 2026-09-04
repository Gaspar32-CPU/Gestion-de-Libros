import { z } from "zod";

// Bookly es multi-organización: cada institución registra su propio
// dominio (@anima.edu.uy, @providencia.edu.uy, el que sea), así que no
// podemos validar contra una lista fija de dominios permitidos como antes
// (eso bloqueaba el login de cualquier organización que no fuera Ánima).
// En su lugar, rechazamos los proveedores de correo personal/gratuito más
// comunes: alcanza para el objetivo real de este chequeo (evitar que se
// use un correo personal) sin depender de conocer de antemano el dominio
// de cada institución.
const DOMINIOS_PERSONALES = [
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.es',
  'hotmail.com.ar',
  'outlook.com',
  'outlook.es',
  'outlook.com.ar',
  'live.com',
  'yahoo.com',
  'yahoo.es',
  'yahoo.com.ar',
  'icloud.com',
  'me.com',
  'aol.com',
  'protonmail.com',
  'proton.me',
];

function isInstitutionalEmail(email) {
  const dominio = email.toLowerCase().split('@')[1];
  return Boolean(dominio) && !DOMINIOS_PERSONALES.includes(dominio);
}

function isValidCedulaUY(cedula) {
  if (!/^\d{7,8}$/.test(cedula)) return false;
  const nums = cedula.split('').map(Number);
  const verificador = nums.pop();
  
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
      message: "Usa el correo de tu institución, no uno personal (Gmail, Outlook, Yahoo, etc.)",
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
      message: "Usa el correo de tu institución, no uno personal (Gmail, Outlook, Yahoo, etc.)",
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