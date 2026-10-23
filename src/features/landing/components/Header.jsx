import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/useAuth'
import { useOrganizacion } from '../../../hooks/useOrganizacion'

export function Header() {
  // eslint-disable-next-line no-unused-vars
  const { usuario, logout, cargando } = useAuth()
  const datosOrganizacion = useOrganizacion(usuario?.organizacionId)
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <header className="relative bg-bg border-b border-line px-4 md:px-12 lg:px-30">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-1">
          <img src="/Bookly-png.png" alt="" className="w-12" />
          <div className="pt-1">
            <p className="text-xl font-extrabold text-ink leading-none">
              Bookly
            </p>
            <p className="text-xs text-gray-600 font-bold">
              Gestión de biblioteca
            </p>
          </div>
        </div>

        {/* spacer para empujar el nav a la derecha */}
        <div></div>

        <button
          type="button"
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-line bg-white text-ink"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((v) => !v)}
        >
          {menuAbierto ? '✕' : '☰'}
        </button>

        <nav
          onClick={() => setMenuAbierto(false)}
          className={`${menuAbierto ? 'flex' : 'hidden'} lg:flex absolute top-full left-0 right-0 z-40 flex-col gap-2 bg-bg border-b border-line px-4 py-4 shadow-lg text-sm font-bold text-ink-2 lg:static lg:flex-row lg:items-center lg:gap-4 lg:border-0 lg:p-0 lg:shadow-none`}
        >
          <a href="#planes" className="py-2 lg:py-0 hover:text-gray-800">
            Planes
          </a>
          <a href="#faq" className="py-2 lg:py-0 hover:text-gray-800">
            Preguntas
          </a>
          {!usuario ? (
            <>
              <Link
                className="bg-white py-2.5 px-4 text-center rounded-xl border border-line text-ink hover:bg-gray-100 transition-all duration-300 active:translate-y-1 active:scale-100"
                to="/login"
              >
                Iniciar sesión
              </Link>
              <Link
                className="bg-brand py-2.5 px-4 text-center rounded-xl border border-line text-white shadow-[0_6px_16px_-8px_var(--color-brand)] text-bold transition-all duration-300 active:translate-y-1 active:scale-100"
                to="/register"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <button
                className="bg-red-500 py-2.5 px-4 cursor-pointer rounded-xl border border-line text-white hover:bg-red-600 transition-all duration-300 active:translate-y-1 active:scale-100"
                onClick={logout}
              >
                Cerrar sesión
              </button>
              <Link to="/catalogo" className="py-2 lg:py-0">
                {datosOrganizacion?.organizacion?.nombre || 'Mi organización'}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
