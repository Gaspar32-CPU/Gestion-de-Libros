import { usePageTitle } from '../../../hooks/usePageTitle';
import { CrearContrasenaForm } from '../components/CrearContrasenaForm';
import { Sidebar } from "../components/Sidebar";

export default function CrearContrasena() {
  usePageTitle('Creá tu contraseña');

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <Sidebar />

      <div className="flex flex-1 items-center justify-center px-6 py-8 text-left md:p-8">
        <div className="w-full max-w-90">
          <h2 className="mb-1 text-2xl font-bold text-[#10221f]">Creá tu contraseña</h2>
          <p className="mb-7 text-sm text-[#6b7770]">Tu administrador te invitó a Bookly. Elegí una contraseña para activar tu cuenta.</p>

          <CrearContrasenaForm/>
        </div>
      </div>
    </div>
  );
}
