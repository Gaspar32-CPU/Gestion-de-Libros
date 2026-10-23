import { usePageTitle } from '../../../hooks/usePageTitle'
import { RecuperarPassword } from '../components/RecuperarPassword'
import { Sidebar } from '../components/Sidebar'

export default function RecuperarPasswordPage() {
  usePageTitle('Recuperá tu contraseña')

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <Sidebar />

      <div className="flex flex-1 items-center justify-center px-6 py-8 text-left md:p-8">
        <div className="w-full max-w-90">
          <h2 className="mb-1 text-2xl font-bold text-[#10221f]">
            Recuperá tu contraseña
          </h2>
          <p className="mb-7 text-sm text-[#6b7770]">
            Ingresá el correo de tu cuenta y te enviamos un link para elegir
            una contraseña nueva.
          </p>

          <RecuperarPassword />
        </div>
      </div>
    </div>
  )
}
