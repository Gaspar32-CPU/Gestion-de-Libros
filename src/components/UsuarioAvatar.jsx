import { KeyboardArrowRight } from '@mui/icons-material'
import { urlArchivo } from '../utils/urlArchivo'

export default function UsuarioAvatar({ iniciales, nombre, rol, foto }) {
  return (
    <div className="flex gap-2 items-center justify-between w-full min-w-0">
      <div className="flex gap-2 items-center px-2 py-3 min-w-0 flex-1">
        <div className="w-10 h-10 shrink-0 rounded-full bg-lime-500 flex items-center justify-center font-extrabold text-ink overflow-hidden">
          {foto ? <img src={urlArchivo(foto)} alt="" className="w-full h-full object-cover" /> : iniciales}
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-bold text-sm text-white truncate hover:underline">
            {nombre}
          </p>
          <p className="text-xs font-semibold text-white/55 truncate">{rol}</p>
        </div>
      </div>
      <KeyboardArrowRight fontSize="small" className="shrink-0" />
    </div>
  )
}
