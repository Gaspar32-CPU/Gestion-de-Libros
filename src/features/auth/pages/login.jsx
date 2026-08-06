import React, { useState } from 'react';

import { usePageTitle } from '../../../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';

const ALLOWED_DOMAINS = ['@anima.edu.uy', '@estudiantes.anima.edu.uy'];

function isInstitutionalEmail(email) {
  return ALLOWED_DOMAINS.some((domain) => email.toLowerCase().endsWith(domain));
}

export default function Login() {
  usePageTitle('Iniciar sesión');

  const handleGuest = () => {
    alert('Entrando como invitado (definir a dónde redirige)');
  };

  return (
    <div className="flex min-h-screen w-full font-sans bg-[#f4f2ee] flex-col md:flex-row">
      <div className="relative flex flex-1 flex-col items-start justify-center overflow-hidden bg-gradient-to-b from-[#14877a] to-[#0f5c53] px-6 py-10 text-white md:px-14 md:py-12">
        <div className="pointer-events-none absolute -right-[15%] -top-[20%] h-[60%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)]" />

        <Link to="/" className="absolute left-6 top-6 ml-2 text-2xl font-semibold tracking-wide hover:text-gray-100 md:left-8 md:top-8">
          Bookly
        </Link>

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

          <LoginForm/>

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
            <Link to="/register" className="font-semibold text-[#14877a] no-underline hover:underline">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}