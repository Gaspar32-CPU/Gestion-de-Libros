import React, { useState } from 'react';

import { usePageTitle } from '../../../hooks/usePageTitle';

const ALLOWED_DOMAINS = ['@anima.edu.uy', '@estudiantes.anima.edu.uy'];

function isInstitutionalEmail(email) {
  return ALLOWED_DOMAINS.some((domain) => email.toLowerCase().endsWith(domain));
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  usePageTitle('Iniciar sesión');

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if (!isInstitutionalEmail(email)) {
      setError('Usá tu correo institucional (ej: @anima.edu.uy).');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      alert(`¡Bienvenido/a, ${email}! (esto luego será una redirección real)`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    alert('Entrando como invitado (definir a dónde redirige)');
  };

  return (
    <div className="flex min-h-screen w-full font-sans bg-[#f4f2ee] flex-col md:flex-row">
      <div className="relative flex flex-1 flex-col items-start justify-center overflow-hidden bg-gradient-to-b from-[#14877a] to-[#0f5c53] px-6 py-10 text-white md:px-14 md:py-12">
        <div className="pointer-events-none absolute -right-[15%] -top-[20%] h-[60%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)]" />

        <span className="absolute left-6 top-6 ml-2 text-2xl font-semibold tracking-wide md:left-8 md:top-8">
          Bookly
        </span>

        <h1 className="mb-5 max-w-[480px] text-left text-4xl font-bold leading-tight md:text-[3.2rem]">
          Una biblioteca ordenada y a mano.
        </h1>

        <p className="mb-12 max-w-[420px] text-left text-base leading-relaxed text-white/85">
          Explorá el catálogo, pedí un libro en segundos y seguí tus préstamos
          sin planillas ni papeleo.
        </p>

        <div className="flex gap-12">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">1 clic</span>
            <span className="text-[0.85rem] text-white/75">préstamo automático</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">0</span>
            <span className="text-[0.85rem] text-white/75">planillas de Excel</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-8 text-left md:p-8">
        <div className="w-full max-w-[360px]">
          <h2 className="mb-1 text-2xl font-bold text-[#10221f]">Iniciar sesión</h2>
          <p className="mb-7 text-sm text-[#6b7770]">Usá tu correo institucional.</p>

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
              required
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
              minLength={6}
              maxLength={16}
              required
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

          <div className="my-5 flex items-center text-center text-[0.8rem] text-[#6b7770] before:mr-3 before:h-px before:flex-1 before:border-b before:border-[#e3e0d8] before:content-[''] after:ml-3 after:h-px after:flex-1 after:border-b after:border-[#e3e0d8] after:content-['']">
            <span>o</span>
          </div>

          <button
            className="w-full cursor-pointer rounded-[10px] border border-[#e3e0d8] bg-white py-3.5 text-[0.95rem] font-semibold text-[#10221f] transition-colors hover:border-[#d3cfc4] hover:bg-[#fafaf8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
            onClick={handleGuest}
          >
            Explorar como invitado
          </button>

          <p className="mt-6 text-center text-[0.85rem] text-[#6b7770]">
            ¿No tenés cuenta?{' '}
            <a href="#" className="font-semibold text-[#14877a] no-underline hover:underline">
              Registrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}