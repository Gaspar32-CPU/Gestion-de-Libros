import { KeyboardArrowRight } from "@mui/icons-material";

export default function UsuarioAvatar({ iniciales, nombre, rol }) {
    return (
        <div className="flex gap-2 items-center justify-between w-full">
            <div className="flex gap-2 items-center px-2 py-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-lime-500 flex items-center justify-center font-extrabold text-ink">
                    {iniciales}
                </div>
                <div className="flex flex-col truncate">
                    <p className="font-bold text-sm text-white truncate">{nombre}</p>
                    <p className="text-xs font-semibold text-white/55 truncate">{rol}</p>
                </div>
            </div>
            <KeyboardArrowRight fontSize="small"/>
        </div>
    )
}
