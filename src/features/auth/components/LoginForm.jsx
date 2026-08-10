import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { loginSchema } from "../../../../schemas/auth.schema";

const ALLOWED_DOMAINS = ['@anima.edu.uy', '@estudiantes.anima.edu.uy'];

function isInstitutionalEmail(email) {
  return ALLOWED_DOMAINS.some((domain) => email.toLowerCase().endsWith(domain));
}

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.data),
            });

            if (!res.ok) {
                throw new Error('Credenciales incorrectas.'); 
            }

            const { token } = await res.json();
            login(token);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label className="mb-1.5 mt-4 block text-sm font-semibold text-[#10221f]" htmlFor="email">
                Correo institucional
            </label>
            <input
                id="email"
                type="email"
                className="w-full rounded-[10px] border border-[#e3e0d8] bg-white px-3.5 py-2.5 text-[0.95rem] outline-none transition-colors focus:border-[#14877a] focus:shadow-[0_0_0_3px_rgba(20,135,122,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
                placeholder="nombre@anima.edu.uy"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
            />

            <label className="mb-1.5 mt-4 block text-sm font-semibold text-[#10221f]" htmlFor="password">
                Contraseña
            </label>
            <input
                id="password"
                type="password"
                className="w-full rounded-[10px] border border-[#e3e0d8] bg-white px-3.5 py-2.5 text-[0.95rem] outline-none transition-colors focus:border-[#14877a] focus:shadow-[0_0_0_3px_rgba(20,135,122,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            />

            <a
                href="#"
                className="mb-5 mt-2.5 block text-right text-[0.8rem] text-[#14877a] no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
            >
                ¿Olvidaste tu contraseña?
            </a>

            {error && <p className="-mt-2 mb-4 text-[0.85rem] text-[#c0392b]">{error}</p>}

            <button
                type="submit"
                className="w-full cursor-pointer rounded-[10px] border-none bg-[#14877a] py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#0f5c53] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
                disabled={loading}
            >
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    )
}
