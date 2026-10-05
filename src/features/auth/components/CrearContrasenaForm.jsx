import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { crearContrasenaSchema } from "../../../../schemas/auth.schema";

export function CrearContrasenaForm() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [listo, setListo] = useState(false);
    const navigate = useNavigate();

    if (!token) {
        return (
            <p className="text-[0.95rem] text-[#c0392b]">
                Este link no es válido. Pedile al administrador que te reenvíe la invitación.
            </p>
        );
    }

    if (listo) {
        return (
            <div>
                <p className="mb-4 text-[0.95rem] text-[#10221f]">
                    ¡Listo! Ya podés iniciar sesión con tu nueva contraseña.
                </p>
                <button
                    type="button"
                    onClick={() => navigate('/login', { replace: true })}
                    className="w-full cursor-pointer rounded-[10px] border-none bg-[#14877a] py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#0f5c53]"
                >
                    Ir a iniciar sesión
                </button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = crearContrasenaSchema.safeParse({ contrasena, confirmarContrasena });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/crear-contrasena`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, ...result.data }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.mensaje || data.error || 'No se pudo crear la contraseña.');
            }

            setListo(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="mb-1.5 mt-4 block text-sm font-semibold text-[#10221f]" htmlFor="contrasena">
                Contraseña
            </label>
            <input
                id="contrasena"
                type="password"
                className="w-full rounded-[10px] border border-[#e3e0d8] bg-white px-3.5 py-2.5 text-[0.95rem] outline-none transition-colors focus:border-[#14877a] focus:shadow-[0_0_0_3px_rgba(20,135,122,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
                placeholder="••••••••"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                autoComplete="new-password"
            />

            <label className="mb-1.5 mt-4 block text-sm font-semibold text-[#10221f]" htmlFor="confirmarContrasena">
                Confirmar contraseña
            </label>
            <input
                id="confirmarContrasena"
                type="password"
                className="w-full rounded-[10px] border border-[#e3e0d8] bg-white px-3.5 py-2.5 text-[0.95rem] outline-none transition-colors focus:border-[#14877a] focus:shadow-[0_0_0_3px_rgba(20,135,122,0.15)] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
                placeholder="••••••••"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                autoComplete="new-password"
            />

            {error && <p className="mt-4 mb-0 text-[0.85rem] text-[#c0392b]">{error}</p>}

            <button
                type="submit"
                className="mt-5 w-full cursor-pointer rounded-[10px] border-none bg-[#14877a] py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#0f5c53] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
                disabled={loading}
            >
                {loading ? 'Creando...' : 'Crear contraseña'}
            </button>

            <p className="mt-6 text-center text-[0.85rem] text-[#6b7770]">
                <Link to="/login" className="font-semibold text-[#14877a] no-underline hover:underline">
                    Volver a iniciar sesión
                </Link>
            </p>
        </form>
    )
}
