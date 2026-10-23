import { usePageTitle } from '../../../hooks/usePageTitle'
import { CrearContrasenaForm } from '../components/CrearContrasenaForm'
import { Sidebar } from '../components/Sidebar'

export default function RestablecerContrasena() {
  usePageTitle('Restablecé tu contraseña')

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <Sidebar />

      <div className="flex flex-1 items-center justify-center px-6 py-8 text-left md:p-8">
        <div className="w-full max-w-90">
          <h2 className="mb-1 text-2xl font-bold text-[#10221f]">
            Restablecé tu contraseña
          </h2>
          <p className="mb-7 text-sm text-[#6b7770]">
            Elegí una contraseña nueva para tu cuenta de Bookly.
          </p>

          <CrearContrasenaForm
            endpoint="/auth/restablecer-contrasena"
            mensajeSinToken="Este link no es válido. Volvé a pedir uno desde “¿Olvidaste tu contraseña?”."
            textoBoton="Guardar contraseña"
            textoCargando="Guardando..."
          />
        </div>
      </div>
    </div>
  )
}
