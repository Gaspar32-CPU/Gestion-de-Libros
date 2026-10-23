import { NavLink } from 'react-router-dom'
import { LogoutOutlined } from '@mui/icons-material'
import UsuarioAvatar from './UsuarioAvatar'
import { obtenerIniciales } from '../utils/obtenerIniciales'
import { urlArchivo } from '../utils/urlArchivo'
import { useAuth } from '../context/useAuth'

export default function Sidebar({
  opciones,
  usuario,
  organizacion,
  configuracion,
  abierto = false,
  onCerrar,
}) {
  const { logout } = useAuth()
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col h-screen w-60 bg-ink text-white/55 transition-transform duration-200 md:sticky md:top-0 md:z-auto md:translate-x-0 ${abierto ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="border-b border-b-ink-2">
        <div className="flex gap-1.5 items-center px-4 py-4">
          {configuracion?.logo ? (
            <img
              src={urlArchivo(configuracion.logo)}
              alt="Imagen organizacion"
              className="w-10 h-10 shrink-0 rounded-xl object-cover"
            />
          ) : (
            usuario?.rol === 'super-admin' ? (
              <img
                src="/Bookly-Fondo-Blanco.png"
                alt="Bookly"
                className="w-10 h-10 object-contain"
              />
            ) : (
              <div className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-[#1fa58a] text-sm font-bold text-white">
                {obtenerIniciales(organizacion?.nombre || 'B')}
              </div>
            )
          )}
          <div className="flex flex-col min-w-0">
            <p className="font-extrabold text-white leading-tight">
              {organizacion?.nombre || 'Bookly'}
            </p>
            <p className="text-xs font-semibold">{usuario?.rol === 'super-admin' ? '' : 'Biblioteca'}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        {opciones.map(({ label, icon: Icon, path, badge }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onCerrar}
            className={({ isActive }) =>
              `flex gap-2 items-center rounded-xl py-2 px-3 ${isActive ? 'text-white bg-ink-2' : 'text-white/60 hover:bg-ink-2'}`
            }
          >
            <Icon color="inherit" />
            <p className="font-bold text-sm cursor-pointer">{label}</p>
            {badge > 0 && (
              <span className="ml-auto rounded-full bg-[#86C440] px-[7px] py-px text-[11px] font-extrabold text-[#16324F]">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
      <div className="mt-auto border-t border-t-ink-2 flex items-center">
        <NavLink
          to="/perfil"
          aria-label="Mi perfil"
          className={({ isActive }) =>
            `flex-1 min-w-0 ${isActive ? '' : 'hover:bg-ink-2/20'}`
          }
        >
          <UsuarioAvatar
            iniciales={obtenerIniciales(usuario.nombre)}
            nombre={usuario.nombre}
            rol={usuario.rol}
            foto={usuario.foto}
          />
        </NavLink>
        <div className="flex items-center justify-center w-12 h-12 shrink-0">
          <button
            type="button"
            onClick={logout}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            className="p-2 mx-auto rounded-lg hover:bg-ink-2/20 cursor-pointer shrink-0"
          >
            <LogoutOutlined fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  )
}
