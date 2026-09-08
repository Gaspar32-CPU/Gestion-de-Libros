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
    <div className="flex flex-col items-center w-3/5 h-3/5 p-10 bg-white rounded-lg shadow-md mx-auto my-10">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-4">¡Préstamo confirmado!</h2>
        <p className="text-sm text-gray-700 text-center">
          Has adquirido el libro <span className="font-semibold text-gray-900">{libro.titulo}</span>. Aprobación automática, sin esperas.
        </p>

    </div>
  );
}
