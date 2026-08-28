import { esColorPortada } from '../../utils/portada';

export const LibroSugerencia = ({ portadaUrl, titulo, genero, autor, className="" }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md ${className}`}
    >
      {esColorPortada(portadaUrl) ? (
        <div className="absolute inset-0" style={{ backgroundColor: portadaUrl }} />
      ) : (
        <img
          src={portadaUrl}
          alt={titulo ? `Portada de ${titulo}` : "Portada del libro"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/40 rounded-sm" />
      <div className="relative z-10 px-2 size-full flex flex-col items-start justify-between">
        <p className="text-gray-300 text-sm pl-2 pt-3">{genero}</p>
        <div className="pl-2 pb-3 pr-12 text-start">
          <h3 className="mt-3 text-sm font-semibold text-white">{titulo}</h3>
          <p className="text-gray-400 text-xs">{autor}</p>
        </div>
      </div>
    </div>
  );
};
