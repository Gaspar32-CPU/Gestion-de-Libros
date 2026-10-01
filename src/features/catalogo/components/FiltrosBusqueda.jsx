import Select from '../../../components/Select';

export default function FiltrosBusqueda({
  generos,
  generoFilter,
  onGeneroChange,
  disponibilidadFilter,
  onDisponibilidadChange,
  ordenarPor,
  onOrdenarChange,
}) {
  return (
    <div className="mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-500 font-medium">Filtrar:</span>

        <Select value={generoFilter} onChange={(e) => onGeneroChange(e.target.value)}>
          {generos.map((genero) => (
            <option key={genero} value={genero}>{genero}</option>
          ))}
        </Select>

        <Select value={disponibilidadFilter} onChange={(e) => onDisponibilidadChange(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Disponible">Disponible</option>
          <option value="No disponible">No disponible</option>
        </Select>

        <Select value={ordenarPor} onChange={(e) => onOrdenarChange(e.target.value)}>
          <option value="relevancia">Ordenar por...</option>
          <option value="titulo">Título (A-Z)</option>
          <option value="autor">Autor (A-Z)</option>
          <option value="puntuacion">Mejor puntuados</option>
          <option value="anio">Más recientes</option>
        </Select>
      </div>
    </div>
  );
}
