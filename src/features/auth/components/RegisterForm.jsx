import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../../../schemas/auth.schema";

export function RegisterForm () {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const result = registerSchema.safeParse(form);

    if (form.contrasena !== form.confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Error al registrar el usuario.');
      }

      const { token } = await res.json();
      register(token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    return(
        <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="mb-1.5 block text-sm font-semibold text-stone-900">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="Lucía"
                />
              </div>
              <div>
                <label htmlFor="apellido" className="mb-1.5 block text-sm font-semibold text-stone-900">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="Fernández"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cedula" className="mb-1.5 block text-sm font-semibold text-stone-900">
                  Cédula
                </label>
                <input
                  id="cedula"
                  type="number"
                  name="cedula"
                  pattern="[0-9]*"
                  value={form.cedula}
                  onChange={handleChange}
                  autoComplete="national-identity"
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="51234567"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="mb-1.5 block text-sm font-semibold text-stone-900">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="099 123 456"
                />
              </div>
            </div>


            <div>
              <label htmlFor="correo" className="mb-1.5 block text-sm font-semibold text-stone-900">
                Correo institucional
              </label>
              <input
                id="correo"
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                autoComplete="email"
                className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                placeholder="nombre@anima.edu.uy"
              />
              <p className="mt-1 text-[0.8rem] text-stone-400">Usa tu correo institucional (ej: @anima.edu.uy)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="contrasena" className="mb-1.5 block text-sm font-semibold text-stone-900">Contraseña</label>
                <input
                  id="contrasena"
                  type="password"
                  name="contrasena"
                  value={form.contrasena}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="confirmarContrasena" className="mb-1.5 block text-sm font-semibold text-stone-900">Confirmar contraseña</label>
                <input
                  id="confirmarContrasena"
                  type="password"
                  name="confirmarContrasena"
                  value={form.confirmarContrasena}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  placeholder="••••••••"
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