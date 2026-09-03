import { Navigate, useLocation } from "react-router-dom";

export default function PrestamoExitoso() {
  const { state } = useLocation();
  const libro = state?.libro;

  // Si alguien llega directo a esta URL (sin pasar por la solicitud de
  // préstamo) no hay datos del libro que mostrar: lo mandamos al catálogo.
  if (!libro) {
    return <Navigate to="/catalogo" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">¡Préstamo exitoso!</h2>
        <p className="text-lg text-gray-700 mb-2">Has prestado el libro:</p>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{libro.titulo}</h3>
        <p className="text-md text-gray-600 mb-4">Autor: {libro.autor}</p>
        <p className="text-md text-gray-600 mb-4">Año: {libro.anio}</p>
        <p className="text-md text-gray-600 mb-4">Categoría: {libro.genero}</p>
        <p className="text-md text-gray-600 mb-4">Puntuación: {libro.puntuacion.toFixed(1)}</p>
    </div>
  );
}
