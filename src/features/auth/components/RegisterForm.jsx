import { useState } from "react";

const ALLOWED_DOMAINS = ['@anima.edu.uy', '@estudiantes.anima.edu.uy'];

function isInstitutionalEmail(email) {
  return ALLOWED_DOMAINS.some((domain) => email.toLowerCase().endsWith(domain));
}

function isValidName(value) {
  return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(value.trim());
}

function isValidCedula(value) {
  const digits = value.replace(/\D/g, ""); // saca puntos, guiones, espacios
  return digits.length === 7 || digits.length === 8;
}

function isValidPhone(value) {
  const digits = value.replace(/\s/g, "");
  return /^[0-9]{8,}$/.test(digits);
}

function isValidPassword(value) {
  return value.length >= 6 && value.length <= 16;
}

export function RegisterForm () {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidName(form.nombre)) {
      setError("Ingresá un nombre válido (mínimo 2 letras).");
      return;
    }

    if (!isValidName(form.apellido)) {
      setError("Ingresá un apellido válido (mínimo 2 letras).");
      return;
    }

    if (!isValidCedula(form.cedula)) {
      setError("Ingresá una cédula válida de 8 caracteres (ej: 51234567).");
      return;
    }

    if (!isInstitutionalEmail(form.correo)) {
      setError('Usá tu correo institucional (ej: @anima.edu.uy).');
      return;
    }

    if (!isValidPhone(form.telefono)) {
      setError("Ingresá un teléfono válido (mínimo 8 dígitos).");
      return;
    }

    if (!isValidPassword(form.contrasena)) {
      setError("La contraseña debe tener entre 6 y 16 caracteres.");
      return;
    }

    console.log("Registrando usuario:", form);
  };

    return(
        <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-900">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="Lucía"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-900">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="Fernández"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-900">
                Cédula
              </label>
              <input
                type="text"
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                placeholder="51234567"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-900">
                Correo institucional
              </label>
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                placeholder="nombre@anima.edu.uy"
                required
              />
              <p className="mt-1 text-[0.8rem] text-stone-400">Debe terminar en @anima.edu.uy</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-900">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="099 123 456"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-900">Contraseña</label>
                <input
                  type="password"
                  name="contrasena"
                  value={form.contrasena}
                  onChange={handleChange}
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="••••••••"
                  minLength={6}
                  maxLength={16}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="-mt-2 text-[0.85rem] text-[#c0392b]">{error}</p>
            )}

            <button
                type="submit"
                className="w-full cursor-pointer rounded-[10px] border-none bg-[#14877a] py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#0f5c53] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
                disabled={loading}
            >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            <p className="mt-6 text-center text-[0.85rem] text-[#6b7770]">
              ¿Ya tenés cuenta?{' '}
              <a href="./login" className="font-semibold text-[#14877a] no-underline hover:underline">
                Iniciar Sesión
              </a>
            </p>
          </form>

  )
}