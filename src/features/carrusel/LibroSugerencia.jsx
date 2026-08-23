export const LibroSugerencia = ({ portadaUrl, titulo, genero, autor }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center h-64 w-full rounded-lg shadow-md bg-contain bg-center"
      style={{ backgroundImage: `url(${portadaUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40 rounded-lg" />
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
