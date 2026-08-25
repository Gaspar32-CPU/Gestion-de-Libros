import { NavLink } from "react-router-dom";
import UsuarioAvatar from "./UsuarioAvatar";
import { obtenerIniciales } from "../utils/obtenerIniciales";

export default function Sidebar ({opciones, usuario}) {
    return(
        <div className="sticky top-0 flex flex-col h-screen w-60 bg-ink text-white/55">
            <div className="border-b border-b-ink-2">
                <div className="flex gap-1.5 items-center px-2 py-3">
                    <img src="/Bookly-png.png" alt="Imagen Institucion" className="w-14"/>
                    <div className="flex flex-col flex-nowrap truncate">
                        <p className="font-extrabold text-white">{usuario?.institucionNombre}</p>
                        <p className="text-xs font-semibold">Biblioteca</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-3.5">
                {opciones.map(({ label, icon: Icon, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex gap-2 items-center rounded-xl py-2 px-3 ${isActive ? "bg-ink-2" : "hover:bg-ink-2"}`
                        }
                    >
                        <Icon color="inherit"/>
                        <p className="font-bold text-sm cursor-pointer">{label}</p>
                    </NavLink>
                ))}
            </div>
            <div className="mt-auto border-t border-t-ink-2">
                <NavLink
                    to="/perfil"
                    className="flex gap-2 items-center rounded-xl py-2 px-3"
                >
                    <UsuarioAvatar iniciales={obtenerIniciales(usuario.nombre)} nombre={usuario.nombre} rol={usuario.rol}/>
                </NavLink>
            </div>
        </div>
    )
}