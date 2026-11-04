import { useEffect } from 'react'

export default function InformacionModal({ onCerrar }) {
  useEffect(() => {
    const overflowOriginal = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflowOriginal
    }
  }, [])
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onCerrar}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-start py-4 border-b border-slate-200 sticky top-0 z-10 bg-white">
          <div className="py-4 px-4 sm:px-6 border-b border-slate-200 w-full">
            <h2 className="text-xl font-bold text-slate-900">Información</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Cómo funciona la importación de libros desde Excel y qué tener en
              cuenta antes de subir tu archivo.
            </p>
          </div>
          <div className="space-y-5 pt-5 px-4 sm:px-6">
            <div>
              <span className="flex items-center gap-2 text-sm font-bold">
                <span className="flex items-center justify-center w-6.5 h-6.5 bg-brand rounded-full text-white">
                  1
                </span>
                Subí un archivo .xlsx
              </span>
              <p className="text-sm text-slate-500 ml-8 mt-0.5">
                Se leen todas las hojas del archivo. La primera fila debe tener
                los encabezados, escritos exactamente así: Libro*, Autor*,
                Género*, Editorial*, ISBN, Idioma, Stock, Fecha de publicación,
                Código interno
              </p>
            </div>
            <div>
              <span className="flex items-center gap-2 text-sm font-bold">
                <span className="flex items-center justify-center w-6.5 h-6.5 bg-brand rounded-full text-white">
                  2
                </span>
                Datos obligatorios
              </span>
              <p className="text-sm text-slate-500 ml-8 mt-0.5">
                Título, autor, género y editorial. Si no ponés Stock, se carga 1
                ejemplar; si no ponés Idioma, se carga “Español”. La fecha de
                publicación y el código interno son opcionales: si no los ponés,
                el libro se guarda sin ellos.
              </p>
            </div>
            <div>
              <span className="flex items-center gap-2 text-sm font-bold">
                <span className="flex items-center justify-center w-6.5 h-6.5 bg-brand rounded-full text-white">
                  3
                </span>
                Si faltan datos, los buscamos por ISBN
              </span>
              <p className="text-sm text-slate-500 ml-8 mt-0.5">
                Completamos lo que falta con Google Books y Open Library, sin
                pisar lo que ya cargaste. Esto solo ocurre cuando al libro le
                falta algún dato obligatorio y tiene ISBN; en ese caso, también
                se completa la fecha de publicación si no la pusiste. Puede
                tardar unos minutos y podés dejar la pantalla abierta.
              </p>
            </div>
            <div>
              <span className="flex items-center gap-2 text-sm font-bold">
                <span className="flex items-center justify-center w-6.5 h-6.5 bg-brand rounded-full text-white">
                  4
                </span>
                Formato de los datos
              </span>
              <p className="text-sm text-slate-500 ml-8 mt-0.5">
                El ISBN puede llevar espacios o guiones. La fecha puede ser solo
                el año (1967) o AAAA-MM-DD, y no puede ser posterior al año
                actual.
              </p>
            </div>
            <div>
              <span className="flex items-center gap-2 text-sm font-bold">
                <span className="flex items-center justify-center w-6.5 h-6.5 bg-brand rounded-full text-white">
                  5
                </span>
                Código interno
              </span>
              <p className="text-sm text-slate-500 ml-8 mt-0.5">
                Es opcional. Si lo dejás vacío, el libro se guarda sin código
                interno. Si lo completás, no puede repetirse con otro libro de
                tu biblioteca ni con otra fila del archivo, y puede tener hasta
                50 caracteres.
              </p>
            </div>
            <div>
              <span className="flex items-center gap-2 text-sm font-bold">
                <span className="flex items-center justify-center w-6.5 h-6.5 bg-brand rounded-full text-white">
                  6
                </span>
                Revisá antes de guardar
              </span>
              <p className="text-sm text-slate-500 ml-8 mt-0.5">
                Al terminar la validación ves cuántos libros están listos y
                cuántos se rechazaron, con el motivo de cada uno. No se guarda
                nada hasta que toques Importar, y podés cancelar en cualquier
                momento.
              </p>
            </div>
            <div>
              <span className="flex items-center gap-2 text-sm font-bold">
                <span className="flex items-center justify-center w-6.5 h-6.5 bg-brand rounded-full text-white">
                  7
                </span>
                Qué se rechaza
              </span>
              <p className="text-sm text-slate-500 ml-8 mt-0.5">
                Libros con ISBN inválido, con un ISBN o código interno que ya
                existen en tu biblioteca, o con textos demasiado largos. Un
                libro rechazado no frena a los demás: los que están listos se
                importan igual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
