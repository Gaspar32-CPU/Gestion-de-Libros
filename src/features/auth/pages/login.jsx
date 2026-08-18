import React, { useState } from 'react';

import { usePageTitle } from '../../../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { Sidebar } from "../components/Sidebar";


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
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <Sidebar />

      <div className="flex flex-1 items-center justify-center px-6 py-8 text-left md:p-8">
        <div className="w-full max-w-90">
          <h2 className="mb-1 text-2xl font-bold text-[#10221f]">Iniciar sesión</h2>
          <p className="mb-7 text-sm text-[#6b7770]">Usá tu correo institucional.</p>

          <LoginForm/>

          <div className="my-5 flex items-center text-center text-[0.8rem] text-[#6b7770] before:mr-3 before:h-px before:flex-1 before:border-b before:border-[#e3e0d8] before:content-[''] after:ml-3 after:h-px after:flex-1 after:border-b after:border-[#e3e0d8] after:content-['']">
            <span>o</span>
          </div>

          <button
            className="w-full cursor-pointer rounded-[10px] border border-[#e3e0d8] bg-white py-3.5 text-[0.95rem] font-semibold text-[#10221f] transition-colors hover:border-[#d3cfc4] hover:bg-[#fafaf8] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
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