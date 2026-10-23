import Select from '../../../components/Select'

function Filtro({ titulo, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {titulo}
      </span>
      {children}
    </label>
  )
}

export default function FiltrosBusqueda({
  generos,
  generoFilter,
  onGeneroChange,
  disponibilidadFilter,
  onDisponibilidadChange,
  idiomas = [],
  idiomaFilter,
  onIdiomaChange,
  ordenarPor,
  onOrdenarChange,
}) {
  return (
    <div className="mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end gap-3">
        <Filtro titulo="Género">
          <Select
            className="w-full"
            value={generoFilter}
            onChange={(e) => onGeneroChange(e.target.value)}
          >
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </Select>
        </Filtro>

        <Filtro titulo="Disponibilidad">
          <Select
            className="w-full"
            value={disponibilidadFilter}
            onChange={(e) => onDisponibilidadChange(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Disponible">Disponible</option>
            <option value="No disponible">No disponible</option>
          </Select>
        </Filtro>

        <Filtro titulo="Idioma">
          <Select
            className="w-full"
            value={idiomaFilter}
            onChange={(e) => onIdiomaChange(e.target.value)}
          >
            {idiomas.map((idioma) => (
              <option key={idioma} value={idioma}>
                {idioma}
              </option>
            ))}
          </Select>
        </Filtro>

        <Filtro titulo="Ordenar por">
          <Select
            className="w-full"
            value={ordenarPor}
            onChange={(e) => onOrdenarChange(e.target.value)}
          >
            <option value="relevancia">Relevancia</option>
            <option value="titulo">Título (A-Z)</option>
            <option value="autor">Autor (A-Z)</option>
            <option value="puntuacion">Mejor puntuados</option>
            <option value="anio">Más recientes</option>
          </Select>
        </Filtro>
      </div>
    </div>
  )
}
