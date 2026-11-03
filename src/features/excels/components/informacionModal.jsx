export default function InformacionModal({ onCerrar }) {
  return(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={onCerrar}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-4 py-4 sm:px-6 border-b border-slate-200 sticky top-0 z-10 bg-white">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Información
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Esta es la información del importador de libros. Aquí puedes encontrar detalles sobre cómo funciona la importación, los formatos aceptados y cualquier otra información relevante que necesites para utilizar esta funcionalidad de manera efectiva.
                </p>
              </div>
            </div>
        </div>
    </div>
  )
}