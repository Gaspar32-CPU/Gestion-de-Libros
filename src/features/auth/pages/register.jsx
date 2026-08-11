import { usePageTitle } from '../../../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { Sidebar } from "../components/Sidebar";
import { RegisterForm } from "../components/RegisterForm";

export default function Register() {
  usePageTitle('Crear cuenta');

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <Sidebar />

      <div className="flex flex-1 items-center justify-center px-6 py-8 text-left md:p-8">
        <div className="w-full max-w-90">
          <h2 className="mb-1 text-2xl font-bold text-[#10221f]">Creá tu cuenta</h2>
          <p className="mb-7 text-sm text-[#6b7770]">Todos los campos son obligatorios.</p>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}