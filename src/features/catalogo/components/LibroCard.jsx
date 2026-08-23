export default function LibroCardVisual({ book }) {
  const { titulo, autor, anio, categoria, categoriaColor, descripcion, color, disponible, puntuacion } = book;

  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className={`h-32 w-full bg-linear-to-br ${color} flex items-end p-4`}>
        <span className="text-white font-bold text-lg leading-tight drop-shadow-sm">{titulo}</span>
      </div>

      <div className="p-4 flex flex-col grow">
        <span className={`text-xs font-bold tracking-wide ${categoriaColor} mb-1`}>{categoria}</span>
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-1">{titulo}</h3>
        <p className="text-sm text-slate-500 mb-3">
          {autor} {anio && `· ${anio}`}
        </p>
        <p className="text-sm text-slate-500 line-clamp-1 mb-4">{descripcion}</p>

        <div className="mt-auto flex items-center justify-between">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              disponible
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {disponible ? 'Disponible' : 'No disponible'}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
            <span className="text-amber-400">★</span>
            {puntuacion.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
