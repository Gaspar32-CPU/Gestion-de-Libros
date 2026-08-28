import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';

export function Header({ onBuscar }) {
  // Mantiene el hook de autenticación original de tu compañero
  const { usuario, logout } = useAuth();
  
  // Estado local para capturar el texto que el usuario escribe en la barra
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Función que procesa la búsqueda cuando el usuario presiona Enter
  const handleBusquedaSubmit = (e) => {
    e.preventDefault();
    if (onBuscar) onBuscar(terminoBusqueda);
  };

  return (
    <header className="bg-bg border-b border-line px-30 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 gap-4">
        
        {/* Bloque Izquierdo: Tu Identidad corporativa con Logo PNG Intacto */}
        <div className='flex items-center gap-1 flex-shrink-0'>
          <img src="/Bookly-png.png" alt="Logo Bookly" className='w-12'/>
          <div className='pt-1'>
            <p className="text-xl font-extrabold text-ink leading-none">Bookly</p>
            <p className="text-xs text-gray-600 font-bold">Gestión de biblioteca</p>
          </div>
        </div>

        {/* BARRA DE BÚSQUEDA: Colocada en el centro reemplazando el spacer vacío */}
        <form onSubmit={handleBusquedaSubmit} className="flex-grow max-w-md relative hidden sm:block">
          <div className="relative w-full">
            <input
              type="text"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              placeholder="Buscar por título, autor o código..."
              className="w-full py-2 pl-10 pr-4 bg-gray-50 border border-line rounded-xl text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-brand focus:bg-white transition-colors"
            />
            {/* Ícono de Lupa SVG Puro */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="11" cy="12" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>
        </form>

        {/* Bloque Derecho: Tu Menú de navegación y autenticación condicional intactos */}
        <nav className="flex items-center gap-4 text-sm font-bold text-ink-2 flex-shrink-0">
          <a href="#planes" className="hover:text-gray-800">Planes</a>
          <a href="#comparativa" className="hover:text-gray-800">Comparativa</a>
          <a href="#faq" className="hover:text-gray-800">Preguntas</a>
          
          {!usuario ? (
            <>
              <Link className="bg-white py-2 px-4 rounded-xl border border-line text-ink hover:bg-gray-100 transition-all duration-300 active:translate-y-1 active:scale-100" to="/login">            
                Iniciar sesión
              </Link>
              <Link className="bg-brand py-2 px-4 rounded-xl border border-line text-white shadow-[0_6px_16px_-8px_var(--color-brand)] text-bold transition-all duration-300 active:translate-y-1 active:scale-100" to="/register">
                Registrarse
              </Link>
            </>
          ) : (
            <button className="bg-red-500 py-2 px-4 cursor-pointer rounded-xl border border-line text-white hover:bg-red-600 transition-all duration-300 active:translate-y-1 active:scale-100" onClick={logout}>
              Cerrar sesión
            </button>
          )}
        </nav>

      </div>
    </header>
  );
}
