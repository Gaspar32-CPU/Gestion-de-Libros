import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-bg border-b border-line px-30">
      <div className="flex items-center justify-between py-4">
        <div>
          <div>
            <p className="text-xl font-extrabold text-ink leading-none">Bookly</p>
            <p className="text-xs text-gray-600 text-ink-3 font-bold">Gestión de biblioteca</p>
          </div>
        </div>

        {/* spacer para empujar el nav a la derecha */}
        <div></div>

        <nav className="flex items-center gap-4 text-sm font-bold text-ink-2">
          <a href="#planes" className="hover:text-gray-800">Planes</a>
          <a href="#comparativa" className="hover:text-gray-800">Comparativa</a>
          <a href="#faq" className="hover:text-gray-800">Preguntas</a>
          <Link className="bg-white py-2 px-4 rounded-xl border border-line text-ink hover:bg-gray-100 transition-all duration-300 active:translate-y-1 active:scale-100" to="/login">            
            Iniciar sesión
          </Link>
          <a className="bg-brand py-2 px-4 rounded-xl border border-line text-white shadow-[0_6px_16px_-8px_var(--color-brand)] text-bold transition-all duration-300 active:translate-y-1 active:scale-100" href="#planes">Contratar</a>
        </nav>
      </div>
    </header>
  );
}